import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// CONFIG: number of records
const NUM_DOCTORS = 5;
const NUM_PATIENTS = 10;
const NUM_PROGRAMS = 5;
const NUM_INVENTORIES = 5;

async function clearDatabase() {
  await prisma.order.deleteMany();
  await prisma.prescriptionMedication.deleteMany();
  await prisma.prescriptionProgram.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.diagnosis.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.program.deleteMany();
  // await prisma.finance.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();
}

async function seed() {
  console.log("🧹 Clearing database...");
  await clearDatabase();

  console.log("👤 Creating doctors...");
  const doctors = [];
  for (let i = 0; i < NUM_DOCTORS; i++) {
    const doctorUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "hashed-password",
        role: "DOCTOR",
        doctor: {
          create: {
            specialization: faker.helpers.arrayElement([
              "Cardiology",
              "Neurology",
              "Orthopedics",
              "Pediatrics",
              "General Medicine",
            ]),
            licenseNumber: `DOC-${faker.number.int({ min: 1000, max: 9999 })}`,
            availability: faker.helpers.arrayElement([
              "AVAILABLE",
              "BUSY",
              "AWAY",
            ]),
          },
        },
      },
      include: { doctor: true },
    });
    doctors.push(doctorUser);
  }

  console.log("👤 Creating patients...");
  const patients = [];
  for (let i = 0; i < NUM_PATIENTS; i++) {
    const patientUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "hashed-password",
        role: "PATIENT",
        patient: {
          create: {
            surname: faker.person.lastName(),
            otherNames: faker.person.firstName(),
            referralStatus: faker.datatype.boolean(),
          },
        },
      },
      include: { patient: true },
    });
    patients.push(patientUser);
  }

  console.log("👤 Creating admins...");
  const adminUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "hashed-password",
      role: "ADMIN",
      admin: {
        create: {
          surname: faker.person.lastName(),
          otherNames: faker.person.firstName(),
        },
      },
    },
    include: { admin: true },
  });

  console.log("💊 Creating inventories and stocks...");
  const inventories = [];
  const medicationPhotos = [
    "https://plus.unsplash.com/premium_photo-1670981099497-078707655bd4?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhdGlvbnN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVkaWNhdGlvbnN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1696861286643-341a8d7a79e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lZGljYXRpb25zfGVufDB8fDB8fHww",
  ];

  const money = (min: number, max: number) =>
    faker.number.float({ min, max, fractionDigits: 2 }).toFixed(2);

  // usage
  for (let i = 0; i < NUM_INVENTORIES; i++) {
    const category = faker.helpers.arrayElement([
      "MEDICATION",
      "EQUIPMENT",
      "CONSUMABLE",
    ]);
    const inventory = await prisma.inventory.create({
      data: {
        name: faker.commerce.productName(),
        category,
        image:
          category === "MEDICATION"
            ? faker.helpers.arrayElement(medicationPhotos)
            : null,
        stocks: {
          create: {
            unitCost: new Prisma.Decimal(money(500, 12_000)),
            numberAvailable: faker.number.int({ min: 50, max: 500 }),
            batchNo: `BATCH-${faker.number.int({ min: 1, max: 100 })}`,
            expiry: faker.date.future(),
          },
        },
      },
    });
    inventories.push(inventory);
  }

  console.log("🏋️ Creating programs...");
  const programs = [];
  for (let i = 0; i < NUM_PROGRAMS; i++) {
    const program = await prisma.program.create({
      data: {
        name: faker.commerce.productName(),
        type: faker.helpers.arrayElement(["SURGERY", "TEST", "SCAN"]),
        description: faker.commerce.productDescription(),
        durationMinutes: faker.number.int({ min: 15, max: 180 }),
        unitCost: new Prisma.Decimal(money(70_000, 300_000)),
      },
    });
    programs.push(program);
  }

  console.log(
    "📅 Creating appointments, diagnoses, prescriptions, medications, orders...",
  );
  for (const patient of patients) {
    // Each patient gets 1-3 appointments
    const numAppointments = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < numAppointments; i++) {
      const doctor = faker.helpers.arrayElement(doctors);
      const appointment = await prisma.appointment.create({
        data: {
          patientId: patient.patient!.id,
          doctorId: doctor.doctor!.id,
          reason: faker.lorem.sentence(),
          appointmentStatus: faker.helpers.arrayElement([
            "SCHEDULED",
            "COMPLETE",
            "MISSED",
          ]),
          startTime: faker.date.recent(),
          endTime: faker.date.future(),
        },
      });

      // Diagnosis for appointment
      const diagnosis = await prisma.diagnosis.create({
        data: {
          description: faker.lorem.sentence(),
          severity: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
          appointmentId: appointment.id,
        },
      });

      // Prescription linked to diagnosis
      const prescription = await prisma.prescription.create({
        data: {
          diagnosisId: diagnosis.id,
          notes: faker.lorem.sentence(),
        },
      });

      // Prescription medications
      const medCount = faker.number.int({ min: 1, max: 3 });

      const medicationInventories = inventories.filter(
        (inv) => inv.category === "MEDICATION",
      );

      const selectedInventories = faker.helpers.arrayElements(
        medicationInventories,
        medCount,
      );

      for (const inventory of selectedInventories) {
        await prisma.prescriptionMedication.create({
          data: {
            prescriptionId: prescription.id,
            inventoryId: inventory.id,
            dosage: `${faker.number.int({ min: 100, max: 500 })}mg`,
            frequency: `${faker.number.int({ min: 1, max: 3 })}x daily`,
            durationDays: faker.number.int({ min: 3, max: 14 }),
            quantityPrescribed: faker.number
              .float({ min: 500, max: 5000, fractionDigits: 2 })
              .toFixed(2),
            instructions: faker.lorem.sentence(),
          },
        });
      }

      // Prescription programs
      const programCount = faker.number.int({ min: 0, max: 2 });

      const selectedPrograms =
        programCount === 0
          ? []
          : faker.helpers.arrayElements(programs, programCount);

      for (const program of selectedPrograms) {
        await prisma.prescriptionProgram.create({
          data: {
            prescriptionId: prescription.id,
            programId: program.id,
            scheduleDate: faker.date.future(),
            priority: faker.helpers.arrayElement(["HIGH", "MEDIUM", "LOW"]),
            instructions: faker.lorem.sentence(),
          },
        });
      }

      // Order for prescription
      await prisma.order.create({
        data: {
          prescriptionId: prescription.id,
          totalAmount: faker.number
            .float({ min: 500, max: 5000, fractionDigits: 2 })
            .toFixed(2),

          status: faker.helpers.arrayElement(["PENDING", "PAID", "CANCELLED"]),
        },
      });
    }
  }

  console.log("✅ Seeding complete!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
