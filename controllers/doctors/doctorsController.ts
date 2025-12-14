import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { sendError, sendSuccess } from "../../utils/response";
const prisma = new PrismaClient();

export const getDoctors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const doctors = await prisma.user.findMany({
      where: { role: "DOCTOR" },
    });

    if (!doctors || doctors.length === 0) {
      sendSuccess(res, "No doctors found.");
      return;
    }

    sendSuccess(res, "Doctors fetched successfully.", doctors);
  } catch (error: any) {
    console.error("Error fetching doctors:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching doctors.");
  }
};
