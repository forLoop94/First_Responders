// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { sendError, sendSuccess } from "../../utils/response";
// const prisma = new PrismaClient();

// export const getAppointments = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const appointments = await prisma.appointment.findMany();

//     if (!appointments || appointments.length === 0) {
//       sendSuccess(res, "No appointments found.");
//       return;
//     }

//     sendSuccess(res, "appointments fetched successfully.", appointments);
//   } catch (error: any) {
//     console.error("Error fetching appointments:", error);

//     // Distinguish Prisma client errors
//     if (error.code && error.code.startsWith("P")) {
//       sendError(res, "A database error occurred. Please try again later.");
//       return;
//     }

//     sendError(res, "Something went wrong while fetching appointments.");
//   }
// };

// export const createAppointment = async (req: Request, res: Response) => {
//   try {
//     const { title, start, end, type, tooltip } = req.body;

//     const newAppointment = { title, start, end, type, tooltip };

//     const user = await prisma.appointment.create({ data: newAppointment });

//     sendSuccess(res, "appointments created successfully.", newAppointment);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     sendError(res, "Something went wrong creating appointments.");
//   }
// };
