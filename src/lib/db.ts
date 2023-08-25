import { PrismaClient } from "@prisma/client";
// boiler plater to acess our db whenever and wherever we want
// easily can create instances of our db

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export interface Show {
  id: string;
  name?: string | null;
  plot?: string | null;
  setting?: string | null;
  date?: Date | null;
  time?: Date | null;
  theater?: string | null;
  performers?: string | null;
  stripId?: string | null;
}

export interface Performer {
  id: string;
  name: string;
  background: string;
  Show: Show[];
}
