import { Router,Request,Response } from "express"; 
import authMiddleware from "../middleware/auth";
import authRouter from "./auth";
import userRouter from "./user";
import emailRouter from "./email";

const rootRouter = Router();

rootRouter.use('/auth', authRouter)

rootRouter.use('/user', authMiddleware, userRouter )

rootRouter.use('/email-template', authMiddleware, emailRouter)

export default rootRouter;