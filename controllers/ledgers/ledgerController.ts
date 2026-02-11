import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../utils/response";

// export const getExpenses = async (req: Request, res: Response) => {
//   try {
//     const expenses = await prisma.ledgerEntry.findMany({
//       where: { type: "DEBIT" },
//     });

//     if (!expenses) {
//       sendError(res, "Expenses not found", 404);
//       return;
//     }
//     sendSuccess(res, "Expenses fetched successfully", expenses);
//   } catch (error: any) {
//     console.error("Error fetching expenses:", error);
//     if (error.response) {
//       sendError(res, error.response.data.message);
//     } else {
//       sendError(res, "Error fetching expenses");
//     }
//   }
// };

// export const getExpenses = async (req: Request, res: Response) => {
//   try {
//     const {
//       startDate,
//       endDate,
//       search,
//       // page = "1",
//       // limit = "20",
//     } = req.query;

//     if (typeof startDate !== "string" || typeof endDate !== "string") {
//       return sendError(res, "startDate and endDate are required", 400);
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const expenses = await prisma.ledgerEntry.aggregate({
//       where: {
//         type: "DEBIT",
//         occurredAt: {
//           gte: start,
//           lte: end,
//         },
//       },
//       _sum: {
//         amount: true,
//       },
//     });

//     //const total = result._sum.amount ?? 0;

//     sendSuccess(res, "Expenses fetched successfully", expenses);
//   } catch (error: any) {
//     console.error("Error fetching expenses:", error);
//     if (error.response) {
//       sendError(res, error.response.data.message);
//     } else {
//       sendError(res, "Error fetching expenses");
//     }
//   }
// };

//  /expenses?startDate=2026-02-01&endDate=2026-02-29&page=1&limit=20
//  /expenses?startDate=01-07-2026&endDate=02-09-2026&search=fuel

// export const getExpenses = async (req: Request, res: Response) => {
//   try {
//     const { startDate, endDate, search } = req.query;

//     if (typeof startDate !== "string" || typeof endDate !== "string") {
//       return sendError(res, "startDate and endDate are required", 400);
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const expenses = await prisma.ledgerEntry.aggregate({
//       where: {
//         type: "DEBIT",
//         occurredAt: {
//           gte: start,
//           lte: end,
//         },
//         ...(typeof search === "string" && search.trim() !== ""
//           ? {
//               OR: [
//                 {
//                   description: {
//                     contains: search,
//                     mode: "insensitive",
//                   },
//                 },
//                 {
//                   reference: {
//                     contains: search,
//                     mode: "insensitive",
//                   },
//                 },
//               ],
//             }
//           : {}),
//       },
//       _sum: {
//         amount: true,
//       },
//     });

//     sendSuccess(res, "Expenses fetched successfully", expenses);
//   } catch (error: any) {
//     console.error("Error fetching expenses:", error);
//     sendError(res, "Error fetching expenses");
//   }
// };

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, search } = req.query;

    if (typeof startDate !== "string" || typeof endDate !== "string") {
      return sendError(res, "startDate and endDate are required", 400);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const where: any = {
      type: "DEBIT",
      occurredAt: {
        gte: start,
        lte: end,
      },
    };

    if (typeof search === "string" && search.trim() !== "") {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        // { reference: { contains: search, mode: "insensitive" } },
        // { category: { contains: search, mode: "insensitive" } },
      ];
    }

    const expenses = await prisma.ledgerEntry.findMany({
      where,
      orderBy: { occurredAt: "desc" },
    });

    const total = await prisma.ledgerEntry.aggregate({
      where,
      _sum: {
        amount: true,
      },
    });

    sendSuccess(res, "Expenses fetched successfully", {
      records: expenses,
      totalAmount: total._sum.amount ?? 0,
    });

    //   where: {
    //     type: "DEBIT",
    //     occurredAt: {
    //       gte: start,
    //       lte: end,
    //     },
    //     ...(typeof search === "string" && search.trim() !== ""
    //       ? {
    //           OR: [
    //             {
    //               description: {
    //                 contains: search,
    //                 mode: "insensitive",
    //               },
    //             },
    //             {
    //               reference: {
    //                 contains: search,
    //                 mode: "insensitive",
    //               },
    //             },
    //           ],
    //         }
    //       : {}),
    //   },
    //   _sum: {
    //     amount: true,
    //   },
    // });

    //sendSuccess(res, "Expenses fetched successfully", expenses);
  } catch (error: any) {
    console.error("Error fetching expenses:", error);
    sendError(res, "Error fetching expenses");
  }
};

export const totalRevenue = async (req: Request, res: Response) => {
  const totalRevenue = await prisma.ledgerEntry.aggregate({
    _sum: { amount: true },
    where: { type: "CREDIT" },
  });
  sendSuccess(res, "Total Revenue fetched successfully", totalRevenue);
};

export const totalExpense = async (req: Request, res: Response) => {
  const totalExpense = await prisma.ledgerEntry.aggregate({
    _sum: { amount: true },
    where: { type: "DEBIT" },
  });
  sendSuccess(res, "Total Expenses fetched successfully", totalExpense);
};
