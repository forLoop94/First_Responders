import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const ledgerEntry = await prisma.ledgerEntry.createMany({
    data: [
      {
        title: "Fuel",
        type: "DEBIT",
        amount: 2000.0,
        occurredAt: new Date("02-08-2026"),
      },
      {
        title: "Fuel",
        type: "DEBIT",
        amount: 5000.0,
        occurredAt: new Date("01-08-2026"),
      },
      {
        title: "Fuel",
        type: "DEBIT",
        amount: 1800.0,
        occurredAt: new Date("01-23-2026"),
      },
      {
        title: "Elevator Repairs",
        type: "DEBIT",
        amount: 20000.0,
        description:
          "This is for the repair of the elevator at the emergency exit of the Lagos office",
        occurredAt: new Date("11-08-2025"),
      },
      {
        title: "Referral Bonus",
        type: "DEBIT",
        amount: 5000.0,
        occurredAt: new Date("09-08-2025"),
      },
      {
        title: "Medical Equipments",
        type: "DEBIT",
        amount: 200000.0,
        occurredAt: new Date("02-08-2026"),
      },
    ],
  });

  console.log(ledgerEntry);
};

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
