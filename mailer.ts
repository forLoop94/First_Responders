import bcrypt from "bcryptjs";
import nodeMailer from "nodemailer";
import { Response } from "express";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
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
  const currentUrl = "http://localhost:3000/";

  const uniqueString = uuidv4();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Verify your email to complete the signip and login into your account.</p><p>This link <b>Expires in 10 minutes</b>Click<a href=${
      currentUrl + "api/auth/verify/" + id + "/" + uniqueString
    }>here</a></p>`,
  };

  transporter.sendMail(mailOptions);
};
