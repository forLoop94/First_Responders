import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

const main = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
};

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
