import { Request, Response } from "express";
import { sendError, sendSuccess } from "../../utils/response";
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return sendError(res, "User already exists.", 409);
    }

    const newUser = await prisma.user.create({
      data: { name, email, password, role },
    });

    sendSuccess(res, "User succesfully created", newUser, 201);
  } catch (error) {
    console.error("Registration error:", error);
    return sendError(res, "An error occurred during user registration.");
  }
};
