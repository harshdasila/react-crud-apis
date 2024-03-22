"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUser = exports.signUpUser = void 0;
const client_1 = require("@prisma/client");
const schema_1 = require("../schema");
const user_service_1 = require("../services/user.service");
const jwt_service_1 = require("../services/jwt.service");
const prisma = new client_1.PrismaClient();
const signUpUser = async (req, res) => {
    const data = req.body;
    const { email, password, name, mobileNumber } = data;
    const signUpData = {
        name,
        email,
        password,
        mobileNumber,
    };
    const validationResult = schema_1.signUpSchema.safeParse(signUpData);
    if (!validationResult.success) {
        res.status(422);
        return res.json({
            message: "Invalid Input Types",
            errors: validationResult.error.errors, // Optionally send the validation errors
        });
    }
    try {
        const userPresent = (0, user_service_1.isUserPresent)(email);
        if (await userPresent) {
            return res.status(409).json({
                message: `User with email - ${email} already present.`,
            });
        }
        else {
            const user = await (0, user_service_1.createUser)(email, name, mobileNumber, password);
            const userID = user.user_id;
            const jwtToken = await (0, jwt_service_1.signToken)(userID);
            return res.status(200).json({
                message: "User Created Successfully.",
                token: "Bearer " + jwtToken
            });
        }
    }
    catch (e) {
        return res.status(500).json({
            message: "Error occurred.",
        });
    }
};
exports.signUpUser = signUpUser;
const signInUser = async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    const signInData = {
        email,
        password
    };
    const validationResult = schema_1.signInSchema.safeParse(signInData);
    if (!validationResult.success) {
        res.status(422);
        return res.json({
            message: "Invalid Input Types",
            errors: validationResult.error.errors, // Optionally send the validation errors
        });
    }
    try {
        const userExists = await (0, user_service_1.isUserExists)(email, password);
        if (userExists) {
            const userId = userExists.user_id;
            const jwtToken = await (0, jwt_service_1.signToken)(userId);
            res.json({
                message: "Token Created",
                token: "Bearer " + jwtToken
            });
        }
        else {
            return res.status(401).json({
                message: "User do not exists."
            });
        }
    }
    catch {
        res.status(402);
        res.json({
            message: "Error in creating token."
        });
    }
};
exports.signInUser = signInUser;