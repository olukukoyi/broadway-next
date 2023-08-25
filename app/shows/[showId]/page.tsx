import Card from "@/components/Card";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import { prisma } from "../../../src/lib/db";
import StripeButton from "@/components/StripeButton";

interface pageProps {
  params: { showId: string };
}

const getShowDetails = async (id: string) => {
  const res = await prisma?.show.findUnique({
    where: {
      id,
    },
  });
  return res;
};

function convertToArray(namesString: string) {
  const namesArray = namesString.split("\n");
  return namesArray;
}

const Page = async ({ params }: pageProps) => {
  const id = params.showId;
  const show = await getShowDetails(id);
  let performersArray;

  if (typeof show?.performers === "string") {
    performersArray = convertToArray(show?.performers);
  } else {
    performersArray = show?.performers;
  }

  if (!show) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center border text-white bg-bluegray bg-opacity-60">
      <h1 className=" flex text-lightblue text-3xl font-bold bg-black bg-opacity-30 rounded px-2 py-4">Show details id: <h2 className="text-smoke underline font-medium px-2">{params.showId}</h2></h1>
      <h1 className=" flex text-lightblue text-3xl font-bold bg-black bg-opacity-30 rounded px-2 py-4">Show: <h2 className="text-red font-medium px-2">{show?.name}</h2></h1>
      <div className="flex flex-col space-y-3 items-center justify-center text-3xl px-2 py-4">
        <h1 className="text-lightblue font-bold bg-black bg-opacity-30 rounded">Performers:</h1>
        {performersArray?.map((name) => {
          return <Card key={name} name={name}></Card>;
        })}
      </div>
      <h1 className="flex text-lightblue text-3xl font-bold bg-black bg-opacity-30 rounded px-2 py-4">ID for stripe: <h2 className="text-smoke underline font-medium px-2">{show?.stripId}</h2></h1>

    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  // const posts = await fetch("https://.../posts").then((res) => res.json());
  const shows = await prisma.show.findMany();

  return shows.map((show) => ({
    showId: show.id,
  }));
}
