import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must contain at least 3 characters"),

    email: z
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(6, "Password must contain at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type RegisterFormData = z.infer<typeof registerSchema>;