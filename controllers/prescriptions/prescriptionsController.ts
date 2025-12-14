import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendError, sendSuccess } from "../../utils/response";
const prisma = new PrismaClient();

export const getPrescriptions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prescriptions = await prisma.prescription.findMany();

    if (!prescriptions || prescriptions.length === 0) {
      sendSuccess(res, "No prescriptions found.");
      return;
    }

    sendSuccess(res, "prescriptions fetched successfully.", prescriptions);
  } catch (error: any) {
    console.error("Error fetching prescriptions:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching prescriptions.");
  }
};
