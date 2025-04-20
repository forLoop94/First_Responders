import { Response } from "express";

export const sendSuccess = (
  res: Response,
  message: string,
  data?: any,
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

export const sendError = (res: Response, message: string, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
