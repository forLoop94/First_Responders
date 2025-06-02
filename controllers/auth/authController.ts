import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendError, sendSuccess } from "../../utils/response";
import { PrismaClient } from "../../generated/prisma";
import { sendVerificationEmail } from "../../mailer";
import { matchPassword } from "../../utils/matchPassword";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken";
const prisma = new PrismaClient();
import dotenv from "dotenv";
import {
  AuthenticatedRequest,
  IJwtPayload,
} from "../../types/authenticatedRequest";
dotenv.config();

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

    sendSuccess(res, "User succesfully created", newUser, 201);
    //sendVerificationEmail(newUser, res);
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

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 180000,
      });

    return sendSuccess(res, "Login Succesful");
  } catch (error) {
    console.error("Login error:", error);
    return sendError(res, "An error occurred during user login.");
  }
};

export const tokenRefresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    sendError(res, "Refresh token not available or expired", 401);
    return;
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as IJwtPayload;

    const newAccessToken = generateAccessToken(payload.id, payload.role);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60000,
    });

    sendSuccess(res, "Token refreshed", null);
  } catch (error) {
    sendError(res, "Invalid or expired refresh token", 403);
    return;
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  sendSuccess(res, "Logged out successfully");
};
