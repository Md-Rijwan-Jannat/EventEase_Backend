/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserServices } from "./auth.service";
import config from "../../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";

// Controller to register a new user
const registerUser = catchAsync(async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const { result, accessToken } = await UserServices.registerUserIntoDB(
    req.body
  );

  // Set a cookie for the access token
  res.cookie("accessToken", accessToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax", // Adjust as per requirements
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created successfully",
    data: result,
    accessToken: accessToken,
  });
});

// Controller to log in a user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { user, accessToken } = await UserServices.loginUserFromDB(req.body);

  // Set a cookie for the access token
  res.cookie("accessToken", accessToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: user,
    accessToken: accessToken,
  });
});

// Controller to log out a user
const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  await UserServices.logoutUserFromDB(token);

  // Clear the access token cookie
  res.clearCookie("accessToken", {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged out successfully",
  });
});

const checkAuth = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.checkAuth(req.user.id);

  // Clear the access token cookie
  res.clearCookie("accessToken", {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged out successfully",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
};
