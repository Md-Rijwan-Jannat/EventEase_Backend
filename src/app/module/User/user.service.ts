import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TUser } from "../Auth/auth.interface";
import { User } from "../Auth/auth.model";

// Get all users
const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

// Get a single user by ID
const getUserById = async (id: string) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

// Update a user by ID
const updateUser = async (id: string, payload: Partial<TUser>) => {
  const isUserExists = await User.findById(id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select("-password");

  console.log("user should update", user, payload);

  return user;
};

// Delete a user by ID
const deleteUser = async (id: string) => {
  const isUserExists = await User.findById(id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const user = await User.findByIdAndDelete(id);

  return user;
};

export const UserServices = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
