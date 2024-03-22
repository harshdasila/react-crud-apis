import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { signUpSchema } from "../schema";
import { signInType } from "../types";
import { signInUser, signUpUser } from "../controllers/auth";

const authRouter = Router();
const prisma = new PrismaClient();


authRouter.post("/signup", signUpUser)

authRouter.post("/signin", signInUser)


export default authRouter;
