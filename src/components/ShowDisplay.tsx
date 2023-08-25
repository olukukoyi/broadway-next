import React from "react";
import { type Show, type Performer } from "@/lib/db";
import Link from "next/link";

interface ShowDisplayProps {
  show: Show;
}

export const ShowDisplay = ({ show }: ShowDisplayProps) => {
  const showId = show.id;
  return (
    <div className="p-3 text-smoke font-bold text-lg flex flex-col border border-bluegray items-center justify-center  bg-bluegray bg-opacity-60">
      {show.name} <Link href={`/shows/${showId}`} className="underline text-darkblue hover:text-primary hover:bg-white hover:bg-opacity-70 hover:rounded">show details</Link>
    </div>
  );
};
