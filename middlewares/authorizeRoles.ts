import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/authenticatedRequest";
import { JwtPayload } from "jsonwebtoken";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const user = req.user as JwtPayload & { role: string };
    console.log("User:", user, "Allowed:", allowedRoles);

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};
