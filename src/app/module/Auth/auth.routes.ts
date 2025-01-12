/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { UserValidation } from "./auth.validation";
import Auth from "../../middlewares/auth";

const router = express.Router();

// Register a new user
router.post(
  "/register",
  validateRequest(UserValidation.registerUserValidationSchema),
  AuthController.registerUser
);

// Log in a user
router.post(
  "/login",
  validateRequest(UserValidation.loginUserValidationSchema),
  AuthController.loginUser
);

// Log out a user
router.post("/logout", Auth(), AuthController.logoutUser);

export const AuthRoutes = router;
