import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/authenticatedRequest";
import { sendError } from "../utils/response";

dotenv.config();

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    sendError(res, "Unauthorized. Login again", 401);
    return;
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables"
    );
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      sendError(res, "Unauthorized. Login again", 401);
      return;
    }
    req.user = user as jwt.JwtPayload;
    next();
  });
};
