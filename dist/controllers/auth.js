"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.signInUser = exports.signUpUser = void 0;
const client_1 = require("@prisma/client");
const schema_1 = require("../schema");
const user_service_1 = require("../services/user.service");
const jwt_service_1 = require("../services/jwt.service");
const index_config_1 = require("../config/index.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const signUpUser = async (req, res) => {
    const data = req.body;
    const { email, password, name, mobileNumber } = data;
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    console.log(hashedPassword);
    const signUpData = {
        name,
        email,
        password,
        mobileNumber,
    };
    const validationResult = schema_1.signUpSchema.safeParse(signUpData);
    // const hashedSignUpData = {
    //   name,
    //   email,
    //   hashedPassword,
    //   mobileNumber,
    // }
    if (!validationResult.success) {
        res.status(422);
        return res.json({
            message: "Invalid Input Types",
            errors: validationResult.error.errors, // Optionally send the validation errors
        });
    }
    try {
        const userPresent = await (0, user_service_1.isUserPresent)(email);
        if (userPresent) {
            return res.status(409).json({
                message: `User with email - ${email} already present.`,
            });
        }
        else {
            const user = await (0, user_service_1.createUser)(email, name, mobileNumber, hashedPassword);
            const userID = user.user_id;
            const user_role_id = user.user_role_id;
            const jwtToken = await (0, jwt_service_1.signToken)(userID, user_role_id);
            return res.status(200).json({
                message: "User Created Successfully.",
                token: "Bearer " + jwtToken,
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
        password,
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
            const user_role_id = userExists.user_role_id;
            const jwtToken = await (0, jwt_service_1.signToken)(userId, user_role_id);
            res.json({
                message: "Token Created",
                token: "Bearer " + jwtToken,
            });
        }
        else {
            return res.status(401).json({
                message: "User do not exists.",
            });
        }
    }
    catch {
        res.status(402);
        res.json({
            message: "Error in creating token.",
        });
    }
};
exports.signInUser = signInUser;
const validateUser = async (req, res) => {
    const body = req.body;
    const token = body.token;
    const jwtToken = token.split(" ")[1];
    try {
        if (!jwtToken) {
            return res
                .status(400)
                .json({ success: false, message: "Token is missing" });
        }
        const decoded = jsonwebtoken_1.default.verify(jwtToken, index_config_1.config.jwt.secret);
        return res.status(200).json({ success: true, message: "Token is valid" });
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
exports.validateUser = validateUser;
