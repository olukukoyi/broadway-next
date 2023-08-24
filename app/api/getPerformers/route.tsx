import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const performers = await prisma.performer.findMany();

    console.log(performers);

    return NextResponse.json({ performers });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal error: ");
  }
}
