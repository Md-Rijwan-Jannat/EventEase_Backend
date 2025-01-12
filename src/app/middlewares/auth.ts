import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { verifyToken } from "../utils/tokenGenerateFunction";
import config from "../../config";
import { User } from "../module/Auth/auth.model";

const Auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // Verify the token
    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email } = decoded;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    // Attach user information to the request object
    req.user = decoded as JwtPayload;

    // Continue to the next middleware or route handler
    next();
  });
};

export default Auth;
