import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { sendError, sendSuccess } from "../../utils/response";
import { PrismaClient } from "../../generated/prisma";
import { sendVerificationEmail } from "../../mailer";
import { matchPassword } from "../../utils/matchPassword";
import { generateAccessToken } from "../../utils/generateToken";
const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return sendError(res, "User already exists.", 409);
    }

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    //sendSuccess(res, "User succesfully created", newUser, 201);
    sendVerificationEmail(newUser, res);
  } catch (error) {
    console.error("Registration error:", error);
    return sendError(res, "An error occurred during user registration.");
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return sendError(res, "User not found!", 404);
    }

    const isMatch = await matchPassword(password, user.password);

    if (!isMatch) {
      return sendError(res, "Invalid email or password", 403);
    }
    return sendSuccess(
      res,
      "Login Succesful",
      { ...user, token: generateAccessToken(user.id, user.role) },
      200
    );
  } catch (error) {
    console.error("Login error:", error);
    return sendError(res, "An error occurred during user login.");
  }
};
