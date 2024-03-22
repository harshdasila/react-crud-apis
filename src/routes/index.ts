import { Router,Request,Response } from "express"; 
import authMiddleware from "../middleware/auth";
import authRouter from "./auth";
import userRouter from "./user";

const rootRouter = Router();

rootRouter.use('/auth', authRouter)

rootRouter.use('/user', authMiddleware, userRouter )

export default rootRouter;