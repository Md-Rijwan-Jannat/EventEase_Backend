import express from "express";
import * as userController from "./user.controller";
import Auth from "../../middlewares/auth";

const router = express.Router();

// Get all users
router.get("/", Auth(), userController.getAllUsers);

// Get a user by ID
router.get("/:id", Auth(), userController.getUserById);

// Update a user by ID
router.patch("/", Auth(), userController.updateUser);

// Delete a user by ID
router.delete("/", Auth(), userController.deleteUser);

export const UserRoutes = router;
