import Card from "@/components/Card";
import React, { FC } from "react";
import { prisma } from "../../../src/lib/db";

interface pageProps {
  params: { showId: string };
}

const getShowDetails = async (id: string) => {
  console.log("loading");
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

  console.log(performersArray);

  return (
    <div className="flex flex-col items-center justify-center border">
      <h1>show details id: {params.showId}</h1>
      <h1>Show: {show?.name}</h1>
      <div className="flex flex-col space-y-3 items-center justify-center">
        Performers:
        {performersArray?.map((name) => {
          return <Card key={name} name={name}></Card>;
        })}
      </div>
      <h1>ID for stripe: {show?.stripId}</h1>
    </div>
  );
};

export default Page;
