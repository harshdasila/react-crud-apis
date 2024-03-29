import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your Email.")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Please enter your Password.")
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character"
    ),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Please enter your Email.")
      .email("Invalid email address."),
    name: z
      .string()
      .min(1, "Please enter your Name.")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),
    mobileNumber: z
      .string()
      .min(1, "Please enter your Mobile Number.")
      .max(10, "Mobile number must be exactly 10 digits.")
      .regex(/^\d{10}$/, "Mobile number must contain exactly 10 digits."),

    password: z
      .string()
      .min(1, "Please enter your Password.")
      .min(8, "Password must be at least 8 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/,
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character."
      ),
    userRole: z.optional(z.number())
  })
