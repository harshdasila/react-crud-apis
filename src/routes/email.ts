import { Router, Request, Response } from "express";
import { getAllEmailTemplate, getEmailTemplate, updateEmailTemp } from "../controllers/email";

const emailRouter = Router();

emailRouter.get('/', getAllEmailTemplate)

emailRouter.post('/data' , getEmailTemplate)

emailRouter.put('/edit', updateEmailTemp)


export default emailRouter;