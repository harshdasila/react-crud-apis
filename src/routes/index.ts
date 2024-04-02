import { Router } from "express"; 
import authMiddleware from "../middleware/auth";
import authRouter from "./auth";
import userRouter from "./user";
import emailRouter from "./email";
import meRouter from "./me";

const rootRouter = Router();

rootRouter.use('/auth', authRouter)

rootRouter.use('/user', authMiddleware, userRouter )

rootRouter.use('/email-template', authMiddleware, emailRouter)

rootRouter.use('/me' ,authMiddleware, meRouter);

export default rootRouter;