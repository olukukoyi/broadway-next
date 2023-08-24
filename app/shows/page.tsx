import { GetServerSideProps, GetStaticProps } from "next";
import DisplayShows from "@/components/DisplayShows";
import { prisma, type Show, type Performer } from "@/lib/db";

const getShows = async () => {
  const shows = await prisma.show.findMany();
  return shows as Show[];
};

export default async function Page() {
  const shows = await getShows();

  return (
    <div>
      <DisplayShows shows={shows} />
    </div>
  );
}
