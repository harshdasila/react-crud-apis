import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { deleteUser, listUsers, showUserDetails } from "../controllers/user";
import authMiddleware from "../middleware/auth";

const userRouter = Router();
const prisma = new PrismaClient();

userRouter.get('/list', authMiddleware ,listUsers)

userRouter.post('/list',authMiddleware, deleteUser)

userRouter.get('/user-details/:userId', authMiddleware, showUserDetails);


userRouter

export default userRouter;