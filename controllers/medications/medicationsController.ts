// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { sendError, sendSuccess } from "../../utils/response";
// const prisma = new PrismaClient();

// export const getMedications = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const medications = await prisma.medication.findMany();

//     if (!medications || medications.length === 0) {
//       sendSuccess(res, "No medications found.");
//       return;
//     }

//     sendSuccess(res, "medications fetched successfully.", medications);
//   } catch (error: any) {
//     console.error("Error fetching medications:", error);

//     // Distinguish Prisma client errors
//     if (error.code && error.code.startsWith("P")) {
//       sendError(res, "A database error occurred. Please try again later.");
//       return;
//     }

//     sendError(res, "Something went wrong while fetching medications.");
//   }
// };
