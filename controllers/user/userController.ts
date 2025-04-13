import { Request, Response } from "express";

import { PrismaClient } from "../../generated/prisma";
import { sendError, sendSuccess } from "../../utils/response";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();

    if (!users || users.length === 0) {
      sendSuccess(res, "No users found.", [], 200);
      return;
    }

    sendSuccess(res, "Users fetched successfully.", users);
  } catch (error: any) {
    console.error("Error fetching users:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching users.");
  }
};
