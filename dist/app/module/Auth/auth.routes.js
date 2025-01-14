"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Register a new user
router.post("/register", (0, validateRequest_1.default)(auth_validation_1.UserValidation.registerUserValidationSchema), auth_controller_1.AuthController.registerUser);
// Log in a user
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.UserValidation.loginUserValidationSchema), auth_controller_1.AuthController.loginUser);
// Log out a user
router.post("/logout", (0, auth_1.default)(), auth_controller_1.AuthController.logoutUser);
// Check auth user
router.get("/check-auth", (0, auth_1.default)(), auth_controller_1.AuthController.checkAuth);
exports.AuthRoutes = router;
