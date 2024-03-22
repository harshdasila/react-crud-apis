import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { signInSchema, signUpSchema } from "../schema";
import { createUser, isUserExists, isUserPresent } from "../services/user.service";
import jwt from 'jsonwebtoken';
import { signToken } from "../services/jwt.service";
const prisma = new PrismaClient();

export const signUpUser = async (req: Request, res: Response) => {
  const data = req.body;
  const { email, password, name, mobileNumber } = data;
  const signUpData = {
    name,
    email,
    password,
    mobileNumber,
  };

  const validationResult = signUpSchema.safeParse(signUpData);

  if (!validationResult.success) {
    res.status(422);
    return res.json({
      message: "Invalid Input Types",
      errors: validationResult.error.errors, // Optionally send the validation errors
    });
  }

  try {
    const userPresent = isUserPresent(email);
    if (await userPresent) {
      return res.status(409).json({
        message: `User with email - ${email} already present.`,
      });
    } else {
      const user = await createUser(email, name, mobileNumber, password);
      const userID = user.user_id;
      const jwtToken = await signToken(userID)
      return res.status(200).json({
        message: "User Created Successfully.",
        token: "Bearer " + jwtToken
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      message: "Error occurred.",
    });
  }
};


export const signInUser = async(req: Request, res: Response) =>{
  const body = req.body;
  const {email,password} = body;
  const signInData = {
    email,
    password
  };

  const validationResult = signInSchema.safeParse(signInData);

  if(!validationResult.success){
    res.status(422);
    return res.json({
      message: "Invalid Input Types",
      errors: validationResult.error.errors, // Optionally send the validation errors
    });
  }

  try{
    const userExists = await isUserExists(email,password);
    if(userExists){
      const userId = userExists.user_id;
      const jwtToken = await signToken(userId);
      res.json({
        message: "Token Created",
        token: "Bearer " + jwtToken
      })
    }
    else{
      return res.status(401).json({
        message: "User do not exists."
      })
    }
  }
  catch{
    res.status(402);
      res.json({
        message: "Error in creating token."
      })
  }
}
