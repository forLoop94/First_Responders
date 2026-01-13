import { Request } from "express";

export const getPagination = (req: Request) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit as string) || 5, 1);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};
