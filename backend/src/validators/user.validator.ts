import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(10, "Username must be at max 10 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password must be at max 20 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character.",
    ),
});

export const signinSchema = signupSchema;
