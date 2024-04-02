import { Router, Request, Response } from "express";
import { getMyDetails } from "../controllers/me";

const meRouter = Router();

meRouter.get('/', getMyDetails)


export default meRouter