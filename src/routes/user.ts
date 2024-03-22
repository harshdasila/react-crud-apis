import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { listUsers } from "../controllers/user";

const userRouter = Router();
const prisma = new PrismaClient();

userRouter.get('/list', listUsers)

export default userRouter;