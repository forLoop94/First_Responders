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
