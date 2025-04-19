import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { PrismaClient } from "../../generated/prisma";
import { sendError, sendSuccess } from "../../utils/response";
import dotenv from "dotenv";
import { sendResetEmail } from "../../mailer";
const prisma = new PrismaClient();

dotenv.config();

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.params;

  const user = await prisma.user.findFirst({
    where: { email: email },
  });

  if (!user) {
    sendError(res, "User not found", 404);
    return;
  }

  sendResetEmail(user, res);
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, resetString, password, confirmPassword } = req.body;

  const details = await prisma.passwordReset.findFirst({
    where: { userId: userId },
  });

  if (!details) {
    sendError(res, "Password reset information not found", 404);
    return;
  }

  const expiresAt = details.expiresAt;
  const hashedResetString = details.resetString;

  if (expiresAt.getTime() < Date.now()) {
    await prisma.passwordReset.delete({
      where: { id: details.id },
    });

    sendError(res, "Linked has expired. Please sign up again");
    return;
  } else {
    const isMatch = bcrypt.compare(resetString, hashedResetString);

    if (!isMatch) {
      sendError(res, "Reset identifier does not match");
      return;
    }

    if (password !== confirmPassword) {
      sendError(
        res,
        "Password mismatch. New passord must be same as confirmation"
      );
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordReset.delete({
      where: { id: details.id },
    });

    sendSuccess(res, "Password reset successful", null);
    return;
  }
};
