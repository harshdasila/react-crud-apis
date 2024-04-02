import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/token.interface";
import jwt from "jsonwebtoken";
import { JwtPayload } from 'jsonwebtoken';
import { getUserStateData } from "../services/me.service";

export const getMyDetails = async(req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  if(!authHeader){
    return res.json({
        message: "didnt got the token"
    })
  }
  const token: string = authHeader && authHeader.split(" ")[1] || "";
  const decoded = jwt.decode(token) as JwtPayload; // Type assertion
  const id = decoded.id;
  console.log(id,"idddd")
  const userStateData = await getUserStateData(id);
  const stateData = {
    id: userStateData?.user_id,
    role_id: userStateData?.user_role_id
  }
  if(userStateData){
    return res.status(200).json({
        stateData
    })
  }
  else{
    return res.status(404).json({
        message: "Error in fetching userState Data."
    })
  }
};
