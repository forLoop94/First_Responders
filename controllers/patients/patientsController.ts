import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendError, sendSuccess } from "../../utils/response";
const prisma = new PrismaClient();

interface IPatientFilter {
  role: string;
  name: string;
  email?: string;
}

export const getpatients = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { search, name, email, sort } = req.query;

  const whereClause: any = {
    role: "PATIENT",
  };

  if (search) {
    whereClause.OR = [
      { name: { contains: search as string, mode: "insensitive" } },
      { email: { contains: search as string, mode: "insensitive" } },
    ];
  }

  if (name) whereClause.name = name;
  if (email) whereClause.email = email;

  // Handle sorting
  const sortOptions: Record<string, { [key: string]: "asc" | "desc" }> = {
    newest: { createdAt: "desc" },
    oldest: { createdAt: "asc" },
    "a-z": { name: "asc" },
    "z-a": { name: "desc" },
  };

  const orderBy = sortOptions[sort as string] || { createdAt: "desc" };

  // setup pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const skip = (page - 1) * limit;

  // Fetch jobs
  try {
    const [patients, totalPatients] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.user.count({
        where: whereClause,
      }),
    ]);

    if (!patients || patients.length === 0) {
      sendSuccess(res, "No patients found.");
      return;
    }

    const numOfPages = Math.ceil(totalPatients / limit) || 1;

    sendSuccess(res, "patients fetched successfully.", {
      totalPatients,
      numOfPages,
      currentPage: page,
      patients,
    });
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
