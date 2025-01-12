import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

// Get all users
export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

// Get a single user by ID
export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

// Update a user by ID
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.updateUser(req.user.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

// Delete a user by ID
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await UserServices.deleteUser(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
  });
});
