import { z } from "zod";

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .min(3, "Full name must contain at least 3 characters"),

    email: z
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(6, "Password must contain at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;