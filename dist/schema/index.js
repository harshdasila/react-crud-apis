"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.signInSchema = void 0;
const zod_1 = require("zod");
exports.signInSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, "Please enter your Email.")
        .email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(1, "Please enter your Password.")
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/, "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character"),
});
exports.signUpSchema = zod_1.z
    .object({
    email: zod_1.z
        .string()
        .min(1, "Please enter your Email.")
        .email("Invalid email address."),
    name: zod_1.z
        .string()
        .min(1, "Please enter your Name.")
        .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),
    mobileNumber: zod_1.z
        .string()
        .min(1, "Please enter your Mobile Number.")
        .max(10, "Mobile number must be exactly 10 digits.")
        .regex(/^\d{10}$/, "Mobile number must contain exactly 10 digits."),
    password: zod_1.z
        .string()
        .min(1, "Please enter your Password.")
        .min(8, "Password must be at least 8 characters long.")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/, "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character."),
    userRole: zod_1.z.optional(zod_1.z.number())
});
