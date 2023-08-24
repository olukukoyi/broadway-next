"use client";

import React, { useEffect, useState } from "react";
import { prisma, type Show, type Performer } from "@/lib/db";
import { ShowDisplay } from "./ShowDisplay";

interface DisplayShowsProps {
  shows: Show[];
}

function DisplayShows({ shows }: DisplayShowsProps) {
  return (
    <>
      {" "}
      <div>Broadway shows:</div>
      {shows.map((item: Show, idx: number) => {
        return <ShowDisplay key={idx} show={item} />;
      })}
    </>
  );
}

export default DisplayShows;
