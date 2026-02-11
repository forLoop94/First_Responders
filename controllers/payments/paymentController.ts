import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";

import dotenv from "dotenv";
import { sendError } from "../../utils/response";
dotenv.config();

const prisma = new PrismaClient();

// Paystack Initialize Payment API
export const processPayment = async (req: Request, res: Response) => {
  console.log("Request Body:", req.body);
  try {
    const { id } = req.params;
    console.log("Request id:", id);

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      sendError(res, "Order not found", 404);
      return;
    }

    const amountInKobo = order.totalAmount
      .mul(100)
      .toDecimalPlaces(0)
      .toNumber();

    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: order.email,
        amount: amountInKobo, //1 NGN = 100 kobo
        currency: "NGN",
        callback_url: `${process.env.FRONTEND_URL_REACT}/success`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({
      authorizationUrl: paystackResponse.data.data.authorization_url,
    });
  } catch (error: any) {
    console.error("Payment processing error:", error);
    if (error.response) {
      sendError(res, error.response.data.message);
    } else {
      sendError(res, "An unexpected error occurred");
    }
  }
};

// Paystack verify payment API

export const verifyPayment = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { orderId, reference } = req.body;

    const paystackResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });

    if (!order) {
      sendError(res, "Order not found", 404);
      return;
    }

    if (paystackResponse.data.data.status === "success") {
      await prisma.$transaction(async (tx) => {
        for (const item of order.items) {
          await tx.stock.update({
            where: { id: item.stockId },
            data: {
              numberAvailable: { decrement: item.quantity },
              numberSold: { increment: item.quantity },
            },
          });
        }

        await tx.order.update({
          where: { id: order.id },
          data: { status: "PAID" },
        });

        await tx.ledgerEntry.create({
          data: {
            title: "Patient prescription",
            type: "CREDIT",
            amount: order.totalAmount,
            description: `Prescription with reference ${reference}`,
            reference,
            occurredAt: new Date(),
          },
        });
      });

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment" });
  }
};
