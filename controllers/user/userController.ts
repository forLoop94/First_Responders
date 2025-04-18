import { Request, Response } from "express";

import { PrismaClient } from "../../generated/prisma";
import { sendError, sendSuccess } from "../../utils/response";
import { AuthenticatedRequest } from "../../types/authenticatedRequest";
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

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
    });

    if (!user) {
      sendError(res, "User not found.", 404);
      return;
    }

    sendSuccess(res, "User fetched successfully.", user);
  } catch (error: any) {
    console.error("Error fetching user:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching user.");
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    return sendError(res, "Unauthorized. Please log in again.", 401);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      sendError(res, "User not found.", 404);
      return;
    }

    sendSuccess(res, "Current user fetched successfully.", user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    sendError(res, "Something went wrong while fetching current user.");
  }
};
