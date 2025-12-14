import bcrypt from "bcryptjs";
import nodeMailer from "nodemailer";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dotenv from "dotenv";
import { sendError, sendSuccess } from "./utils/response";
dotenv.config();

interface ISendVerificationEmailUser {
  id: string;
  email: string;
}

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("ready for messages");
    console.log(success);
  }
});

export const sendVerificationEmail = async (
  { id, email }: ISendVerificationEmailUser,
  res: Response
) => {
  const uniqueString = uuidv4();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Verify your email to complete the signip and login into your account.</p><p>This link <b>Expires in 10 minutes</b>Click<a href=${
      process.env.CURRENT_VERIFICATION_URL +
      "api/auth/verify/" +
      id +
      "/" +
      uniqueString
    }>here</a></p>`,
  };

  const salt = 10;
  const hashedUniqueString = await bcrypt.hash(uniqueString, salt);

  const createDetails = await prisma.userVerification.create({
    data: {
      userId: id,
      uniqueString: hashedUniqueString,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 600000),
    },
  });

  if (!createDetails) {
    sendSuccess(res, "Verification data saved not found");
  }

  transporter.sendMail(mailOptions);
  sendSuccess(res, "Check your inbox for instructions on how to proceed");
};

export const sendResetEmail = async (
  { id, email }: ISendVerificationEmailUser,
  res: Response
) => {
  const resetString = uuidv4();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Password Reset",
    html: `<p>Verify that you want to reset your password. Please ignore if it's not you</p><p>This link <b>Expires in 10 minutes</b>Click <a href=${
      process.env.RESET_PASSWORD_REDIRECT_URL + id + "/" + resetString
    }>here</a></p>`,
  };

  const salt = 10;
  const hashedResetString = await bcrypt.hash(resetString, salt);

  const createDetails = await prisma.passwordReset.create({
    data: {
      userId: id,
      resetString: hashedResetString,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 600000),
    },
  });

  if (!createDetails) {
    sendError(res, "Password reset data not found");
  }

  transporter.sendMail(mailOptions);
  sendSuccess(res, "Check your inbox for instructions on how to proceed");
};
