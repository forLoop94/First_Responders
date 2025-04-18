import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/authenticatedRequest";
import { sendError } from "../utils/response";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      return sendError(res, "Unauthorized. Please log in again.", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};
