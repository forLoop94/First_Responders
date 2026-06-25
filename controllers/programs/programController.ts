import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../utils/response";
import { getPagination } from "../../utils/paginate";
const prisma = new PrismaClient();

export const getPrograms = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { search, type } = req.query;

    const where: any = { type };

    if (typeof search === "string" && search.trim() !== "") {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }];
    }

    const { page, limit, skip } = getPagination(req);

    const [items, totalItems] = await Promise.all([
      prisma.program.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.program.count({
        where,
      }),
    ]);

    if (!items || items.length === 0) {
      sendSuccess(res, "No programs found.");
      return;
    }

    const numOfPages = Math.ceil(totalItems / limit) || 1;

    sendSuccess(res, "programs fetched successfully.", {
      totalItems,
      numOfPages,
      currentPage: page,
      items,
    });
  } catch (error: any) {
    console.error("Error fetching programs:", error);

    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Error fetching programs");
  }
};

export const createProgram = async (req: Request, res: Response) => {
  const programInput = req.body;

  const newProgram = await prisma.program.create({
    data: programInput,
  });

  sendSuccess(res, "Program created succesfully", newProgram);
};

export const deleteProgram = async (req: Request, res: Response) => {
  const { id } = req.params;

  const program = await prisma.program.findFirst({
    where: { id },
  });

  if (!program) {
    sendError(res, "Program not found", 404);
    return;
  }

  // First check if there are any related prescription programs
  // const relatedCount = await prisma.prescriptionProgram.count({
  //   where: { programId: id }
  // });

  // if (relatedCount > 0) {
  //   return res.status(400).json({
  //     success: false,
  //     message: `Cannot delete program because it is used in ${relatedCount} prescription(s). Remove the program from prescriptions first.`
  //   });
  // }

  // const deletedProgram = await prisma.program.delete({
  //   where: { id }
  // });

  // res.status(200).json({
  //   success: true,
  //   message: 'Program deleted successfully',
  //   data: deletedProgram
  // });

  const deletedProgram = await prisma.$transaction(async (tx) => {
    await tx.prescriptionProgram.deleteMany({
      where: {
        programId: id,
      },
    });

    return await tx.program.delete({
      where: {
        id: id,
      },
    });
  });

  sendSuccess(res, "Program deleted succesfully", deletedProgram);
};
export const updateProgram = async (req: Request, res: Response) => {
  const updates = req.body;
  const { id } = req.params;

  const program = await prisma.program.findFirst({
    where: {
      id: id,
    },
  });

  if (!program) {
    sendError(res, "Program not found", 404);
    return;
  }

  const updatedProgram = await prisma.program.update({
    where: { id },
    data: updates,
  });

  sendSuccess(res, "Program updated succesfully", updatedProgram);
};
