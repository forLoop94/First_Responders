import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";
import { sendError, sendSuccess } from "../../utils/response";
const prisma = new PrismaClient();

export const getpatients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const patients = await prisma.user.findMany({
      where: { role: "PATIENT" },
    });

    if (!patients || patients.length === 0) {
      sendSuccess(res, "No patients found.");
      return;
    }

    sendSuccess(res, "patients fetched successfully.", patients);
  } catch (error: any) {
    console.error("Error fetching patients:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching patients.");
  }
};

export const updatePatients = async (req: Request, res: Response) => {
  const updates = req.body;
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!user) {
    sendError(res, "User not found", 404);
    return;
  }

  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: updates,
  });

  res.status(200).json(updatedUser);
};
