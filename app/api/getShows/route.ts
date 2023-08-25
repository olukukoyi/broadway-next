import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const shows = await prisma.show.findMany();

    return NextResponse.json({ shows });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal error: ");
  }
}
