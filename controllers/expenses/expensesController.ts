import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendError, sendSuccess } from "../../utils/response";
const prisma = new PrismaClient();

export const getExpenses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenses = await prisma.expenses.findMany({
      include: {
        authorizedBy: true,
      },
    });

    if (!expenses || expenses.length === 0) {
      sendSuccess(res, "No expenses found.");
      return;
    }

    sendSuccess(res, "expenses fetched successfully.", expenses);
  } catch (error: any) {
    console.error("Error fetching expenses:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching expenses.");
  }
};
