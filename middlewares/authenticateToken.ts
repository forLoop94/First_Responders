import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import {
  AuthenticatedRequest,
  IJwtPayload,
} from "../types/authenticatedRequest";
import { sendError } from "../utils/response";

dotenv.config();

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    sendError(res, "Unauthorized. Login again", 401);
    return;
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables"
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    ) as IJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    sendError(res, "Unauthorized. Login again", 401);
    return;
  }
};
