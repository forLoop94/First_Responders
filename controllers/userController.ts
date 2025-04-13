import { Request, Response } from "express";

import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};
