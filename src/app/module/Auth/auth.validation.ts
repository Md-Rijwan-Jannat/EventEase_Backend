import { z } from "zod";

// Zod validation schema for user registration
export const registerUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be at most 50 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .max(100, "Email must be at most 100 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),
    imageUrl: z.string().url("Invalid image URL").optional(),
  }),
});

// Zod validation schema for user login
export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email address")
      .max(100, "Email must be at most 100 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),
  }),
});

// Export all validation schemas
export const UserValidation = {
  registerUserValidationSchema,
  loginUserValidationSchema,
};
