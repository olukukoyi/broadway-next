import { PrismaClient } from "@prisma/client";
import { musicals } from "../data/musicals";
import { performers } from "../data/performers";
import { prisma } from "../src/lib/db";

async function main() {
  await prisma.show.createMany({
    data: musicals,
  });
  //   await prisma.performer.createMany({
  //     data: performers,
  //   });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
