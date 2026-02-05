import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendError, sendSuccess } from "../../utils/response";
// import { AuthenticatedRequest } from "../../types/authenticatedRequest";
// import cloudinary from "../../utils/cloudinary";
const prisma = new PrismaClient();
import { Prisma } from "@prisma/client";

interface IOrderItems {
  stockId: string;
  quantity: number;
}

const calculateTotal = async (
  items: IOrderItems[],
): Promise<Prisma.Decimal> => {
  if (!Array.isArray(items)) {
    throw new Error("INVALID_ITEMS");
  }

  let amount = new Prisma.Decimal(0);

  // const stocks = await prisma.stock.findMany({
  //     where: { id: { in: items.map((i) => i.id) } },
  //   });

  for (const item of items) {
    const dbItem = await prisma.stock.findUnique({
      where: { id: item.stockId },
    });

    if (!dbItem) {
      throw new Error(`ITEM_NOT_FOUND:${item.stockId}`);
    }

    // we cant use + or * operators here because they can only on be used on JS numbers. This is money so Prisma provides plus and mul
    amount = amount.plus(dbItem.unitCost.mul(item.quantity));
  }
  return amount;
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany();

    if (!orders || orders.length === 0) {
      sendSuccess(res, "No orders found.", [], 200);
      return;
    }

    sendSuccess(res, "Orders fetched successfully.", orders);
  } catch (error: any) {
    console.error("Error fetching orders:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching orders.");
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, prescriptionId, items } = req.body;

    const totalAmount = await calculateTotal(items);
    const order = await prisma.order.create({
      data: {
        email,
        prescriptionId,
        totalAmount,
        items: {
          create: items,
          // [
          //   { stockId: "uuid-1", quantity: 2 },
          //   { stockId: "uuid-2", quantity: 1 },
          // ],
        },
      },
    });

    sendSuccess(res, "Order created successfully.", order);
  } catch (error: any) {
    console.error("Error creating order:", error);
    if (error.message === "INVALID_ITEMS") {
      sendError(res, "Invalid request: items must be an array", 400);
      return;
    }

    if (error.message?.startsWith("ITEM_NOT_FOUND")) {
      sendError(res, error.message.replace("ITEM_NOT_FOUND:", ""), 404);
      return;
    }
    sendError(res, "Internal Server Error.");
  }
};

// export const updateOrder = async (req: Request, res: Response) => {
//   try {
//     const updates = req.body;
//     const { id } = req.params;

//     const totalAmount = await calculateTotal(updates.items);
//     const order = await prisma.order.update({
//       where: { id: id },
//       data: updates
//     });

//     sendSuccess(res, "Order updated successfully.", order);
//   } catch (error: any) {
//     console.error("Error updating order:", error);
//     if (error.message === "INVALID_ITEMS") {
//       sendError(res, "Invalid request: items must be an array", 400);
//       return;
//     }

//     if (error.message?.startsWith("ITEM_NOT_FOUND")) {
//       sendError(res, error.message.replace("ITEM_NOT_FOUND:", ""), 404);
//       return;
//     }
//     sendError(res, "Internal Server Error.");
//   }
// };

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, items } = req.body;

    const data: any = {};

    if (email !== undefined) {
      data.email = email;
    }

    if (items !== undefined) {
      if (!Array.isArray(items)) {
        return sendError(res, "Invalid request: items must be an array", 400);
      }

      const totalAmount = await calculateTotal(items);
      data.totalAmount = totalAmount;

      data.items = {
        deleteMany: {},
        create: items,
      };
    }

    if (Object.keys(data).length === 0) {
      return sendError(res, "No fields provided for update", 400);
    }

    const order = await prisma.order.update({
      where: { id },
      data,
      include: { items: true },
    });

    sendSuccess(res, "Order updated successfully.", order);
  } catch (error: any) {
    console.error("Error updating order:", error);
    sendError(res, "Internal Server Error.");
  }
};
