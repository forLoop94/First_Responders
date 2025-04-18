import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IJwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: IJwtPayload;
}
