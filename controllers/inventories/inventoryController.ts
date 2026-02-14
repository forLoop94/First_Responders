import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../utils/response";
import { getPagination } from "../../utils/paginate";
const prisma = new PrismaClient();

export const getInventories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { search, type } = req.query;

    const where: any = { category: type };

    if (typeof search === "string" && search.trim() !== "") {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }];
    }

    const { page, limit, skip } = getPagination(req);

    const [items, totalItems] = await Promise.all([
      prisma.inventory.findMany({
        where,
        include: { stocks: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.inventory.count({
        where,
      }),
    ]);

    if (!items || items.length === 0) {
      sendSuccess(res, "No inventories found.");
      return;
    }

    const numOfPages = Math.ceil(totalItems / limit) || 1;

    sendSuccess(res, "Inventories fetched successfully.", {
      totalItems,
      numOfPages,
      currentPage: page,
      items,
    });
  } catch (error: any) {
    console.error("Error fetching inventories:", error);

    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Error fetching inventories");
  }
};
