import { z } from "zod";

export const advisorSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

// Register input
export const advisorRegisterSchema = z.object({
  email: z.string().email().max(50),
  password: z
    .string()
    .min(6)
    .max(50)
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one digit",
    })
    .refine((password) => /[^A-Za-z0-9]/.test(password), {
      message: "Password must contain at least one special character",
    }),
  name: z.string().min(1).max(50),
});
