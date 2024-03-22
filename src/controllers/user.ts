import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const listUsers = async(req: Request, res: Response) => {
    //yaha tlogic to get data from 3rd party api for now
    res.status(200).json({
        message: "successfully reached list users"
    })
}