import React from "react";
import { type Show, type Performer } from "@/lib/db";

interface ShowDisplayProps {
  show: Show;
}

export const ShowDisplay = ({ show }: ShowDisplayProps) => {
  return (
    <div>
      <div>{show.name}</div>
    </div>
  );
};
