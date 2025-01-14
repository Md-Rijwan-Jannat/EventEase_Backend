"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.loginUserValidationSchema = exports.registerUserValidationSchema = void 0;
const zod_1 = require("zod");
// Zod validation schema for user registration
exports.registerUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, "Name is required")
            .max(50, "Name must be at most 50 characters"),
        email: zod_1.z
            .string()
            .email("Invalid email address")
            .max(100, "Email must be at most 100 characters"),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password must be at most 100 characters"),
        imageUrl: zod_1.z.string().url("Invalid image URL").optional(),
    }),
});
// Zod validation schema for user login
exports.loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email("Invalid email address")
            .max(100, "Email must be at most 100 characters"),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password must be at most 100 characters"),
    }),
});
// Export all validation schemas
exports.UserValidation = {
    registerUserValidationSchema: exports.registerUserValidationSchema,
    loginUserValidationSchema: exports.loginUserValidationSchema,
};
