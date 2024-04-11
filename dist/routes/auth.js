"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../controllers/auth");
const authRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
/**
 * @openapi
 * tags:
 *   - name: Authentication
 *     description: APIs related to user authentication
 */
/**
 * @openapi
 * schemes:
 *   - http
 * /auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     description: User Signup with email, password, name, and mobile number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 userData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     role_id:
 *                       type: string
 *       '400':
 *         description: Bad Request. Invalid Input Types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       '409':
 *         description: Conflict. User with the provided email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error. Error occurred during signup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
authRouter.post("/signup", auth_1.signUpUser);
/**
 * @openapi
 * schemes:
 *   - http
 * /auth/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     description: User Login with credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User Logged in Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token for the authenticated user
 *       '400':
 *         description: Bad Request. Invalid username or password.
 *       '422':
 *          description: Invalid Input Types
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 *       '500':
 *         description: Internal Server Error. Something went wrong on the server.
 */
authRouter.post("/signin", auth_1.signInUser);
/**
 * @openapi
 * /auth/validate:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Validate JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad Request. Token is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '401':
 *         description: Unauthorized. Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
authRouter.post("/validate", auth_1.validateUser);
exports.default = authRouter;
