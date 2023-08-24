import React from "react";
import { type Show, type Performer } from "@/lib/db";
import Link from "next/link";

interface ShowDisplayProps {
  show: Show;
}

export const ShowDisplay = ({ show }: ShowDisplayProps) => {
  const showId = show.id;
  console.log(showId);
  return (
    <div className="flex flex-col border items-center justify-center">
      {show.name} <Link href={`/shows/${showId}`}>show details</Link>
    </div>
  );
};
