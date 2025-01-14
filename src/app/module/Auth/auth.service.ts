/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import config from "../../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/tokenGenerateFunction";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TLoginUser, TUser } from "./auth.interface";
import { User } from "./auth.model";

// Service to register a new user
const registerUserIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  const result = await User.create(payload);

  const jwtPayload = {
    id: result._id,
    email: payload.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const { password, ...resultData } = result.toObject();

  return {
    result: resultData,
    accessToken,
  };
};

// Service to log in a user
const loginUserFromDB = async (payload: Partial<TLoginUser>) => {
  // Fetch the user and exclude the password field
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check password
  const isPasswordMatched = await bcrypt.compare(
    payload.password!,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // Create JWT payload
  const jwtPayload = {
    id: user._id,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // Exclude the password from the final result
  const { password, ...result } = user.toObject();

  return {
    user: result,
    accessToken,
  };
};

// Service to log out a user
const logoutUserFromDB = async (token: string) => {
  try {
    jwt.verify(token, config.jwt_access_secret as string);
    // Invalidate the token (if using a token blacklist)
    // Example: Add the token to a blacklist in Redis or DB
    return { message: "Successfully logged out" };
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
};

// Check auth user
const checkAuth = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

export const UserServices = {
  registerUserIntoDB,
  loginUserFromDB,
  logoutUserFromDB,
  checkAuth,
};
