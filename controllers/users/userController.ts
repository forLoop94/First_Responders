import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendError, sendSuccess } from "../../utils/response";
import { AuthenticatedRequest } from "../../types/authenticatedRequest";
import cloudinary from "../../utils/cloudinary";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();

    if (!users || users.length === 0) {
      sendSuccess(res, "No users found.", [], 200);
      return;
    }

    sendSuccess(res, "Users fetched successfully.", users);
  } catch (error: any) {
    console.error("Error fetching users:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching users.");
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
    });

    if (!user) {
      sendError(res, "User not found.", 404);
      return;
    }

    sendSuccess(res, "User fetched successfully.", user);
  } catch (error: any) {
    console.error("Error fetching user:", error);

    // Distinguish Prisma client errors
    if (error.code && error.code.startsWith("P")) {
      sendError(res, "A database error occurred. Please try again later.");
      return;
    }

    sendError(res, "Something went wrong while fetching user.");
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    return sendError(res, "Unauthorized. Please log in again.", 401);
  }
  console.log(req.user);
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        //profileImage: true,
      },
    });

    if (!user) {
      sendError(res, "User not found.", 404);
      return;
    }

    console.log(user);

    sendSuccess(res, "Current user fetched successfully.", user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    sendError(res, "Something went wrong while fetching current user.");
  }
};

// export const userImageUpload = async (req: Request, res: Response) => {
//   try {
//     if (!req.file) {
//       sendError(res, "No file uploaded.", 400);
//       return;
//     }

//     const fileStr = `data:${
//       req.file.mimetype
//     };base64,${req.file.buffer.toString("base64")}`;

//     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//       folder: "user_profiles",
//     });

//     const updatedUser = await prisma.user.update({
//       where: { id: req.body.userId },
//       data: { profileImage: uploadResponse.secure_url },
//     });

//     res.json({
//       message: "Upload successful",
//       imageUrl: uploadResponse.secure_url,
//     });
//   } catch (err) {
//     console.error(err);
//     sendError(res, "Upload failed.", 500);
//     return;
//   }
// };
