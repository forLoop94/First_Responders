import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendError, sendSuccess } from "../../utils/response";
const prisma = new PrismaClient();

export const getInvoices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const invoices = await prisma.invoice.findMany();

    if (!invoices || invoices.length === 0) {
      sendSuccess(res, "No invoices found.");
      return;
    }

    sendSuccess(res, "invoices fetched successfully.", invoices);
  } catch (error: any) {
    console.error("Error fetching invoices:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching invoices.");
  }
};
