import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { addUser, deleteUser, listUsers, showUserDetails, updateUser } from "../controllers/user";
import authMiddleware from "../middleware/auth";

const userRouter = Router();
const prisma = new PrismaClient();

userRouter.get('/list', authMiddleware ,listUsers)

userRouter.post('/list',authMiddleware, deleteUser)

userRouter.get('/user-details/:userId', authMiddleware, showUserDetails);

userRouter.put('/update/:userId', authMiddleware, updateUser);

userRouter.post('/add-user', authMiddleware, addUser);


export default userRouter;