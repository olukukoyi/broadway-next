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
      {shows.map((item: Show, idx: number) => {
        return <ShowDisplay key={idx} show={item} />;
      })}
      <div>DisplayShows</div>
    </>
  );
}

export default DisplayShows;
