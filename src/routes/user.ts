import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  addUser,
  deleteUser,
  listUsers,
  showUserDetails,
  updateUser,
} from "../controllers/user";
import authMiddleware from "../middleware/auth";

const userRouter = Router();
const prisma = new PrismaClient();
/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: APIs related to User
 */

/**
 * @openapi
 * /user/list:
 *   get:
 *     tags:
 *       - Users
 *     summary: List Users
 *     description: Retrieve a list of users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: sortBy
 *         in: query
 *         description: Field to sort by
 *         schema:
 *           type: string
 *       - name: sortOrder
 *         in: query
 *         description: Sort order
 *         schema:
 *           type: string
 *       - name: searchQuery
 *         in: query
 *         description: Search query
 *         schema:
 *           type: string
 *       - name: recordsPerPage
 *         in: query
 *         description: Number of records per page
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Define your user properties here
 *                 totalUsers:
 *                   type: integer
 *                   description: Total number of users
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '402':
 *         description: Error in fetching data from backend
 */
userRouter.get("/list", authMiddleware, listUsers);

/**
 * @openapi
 * /user/list/{userId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete User
 *     description: Delete a user by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Error in deleting user
 */


userRouter.delete("/list/:userId", authMiddleware, deleteUser);

/**
 * @openapi
 * /user/user-details/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get User Details
 *     description: Retrieve details of a user by their ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve details for
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Details of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: User details
 *
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Error in fetching user details.
 */

userRouter.get("/user-details/:userId", authMiddleware, showUserDetails);

/**
 * @openapi
 * /user/update/{userId}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update User Details
 *     description: Update details of a user by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update details for
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The updated email address of the user
 *               number:
 *                 type: string
 *                 description: The updated mobile number of the user
 *               roleId:
 *                 type: integer
 *                 description: The updated role ID of the user
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: Updated user details
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The updated name of the user
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: The updated email address of the user
 *                     number:
 *                       type: string
 *                       description: The updated mobile number of the user
 *                     roleId:
 *                       type: integer
 *                       description: The updated role ID of the user
 *       '400':
 *         description: Bad request. Invalid request body.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Error in updating user details.
 */

userRouter.put("/update/:userId", authMiddleware, updateUser);

/**
 * @openapi
 * /user/add-user:
 *   post:
 *     tags:
 *       - Users
 *     summary: Add User
 *     description: Add a new user with provided details
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               mobileNumber:
 *                 type: string
 *                 description: The mobile number of the user
 *               userRole:
 *                 type: integer
 *                 description: The role ID of the user, default 5
 *     responses:
 *       '200':
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request. Invalid input types or missing fields.
 *       '409':
 *         description: Conflict. User with the provided email already exists.
 *       '500':
 *         description: Internal server error. Error occurred while adding user.
 */

userRouter.post("/add-user", authMiddleware, addUser);

export default userRouter;
