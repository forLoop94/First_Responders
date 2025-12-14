import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { sendError, sendSuccess } from "../../utils/response";
const prisma = new PrismaClient();

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, uniqueString } = req.params;

  const details = await prisma.userVerification.findFirst({
    where: { userId: userId },
  });

  if (!details) {
    sendError(
      res,
      "User verification details not found or user has been verified already",
      404
    );
    return;
  }

  const expiresAt = details.expiresAt;
  const hashedUniqueString = details.uniqueString;

  if (expiresAt.getTime() < Date.now()) {
    await prisma.userVerification.delete({
      where: { id: details.id },
    });
    await prisma.user.delete({
      where: { id: userId },
    });
    sendError(res, "Linked has expired. Please sign up again");
  } else {
    const isAmatch = bcrypt.compare(uniqueString, hashedUniqueString);

    if (!isAmatch) {
      sendError(res, "Invalid verification details", 403);
      return;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });

    await prisma.userVerification.delete({
      where: { id: details.id },
    });
  }
  sendSuccess(res, "User verified successfully");
};
