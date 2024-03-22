import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import { config } from "../config/index.config";
import { TokenData } from "../interfaces/token.interface";

// Define an interface to extend the Request object
interface AuthRequest extends Request {
  userId?: number;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers["authorization"];
  let token = "";
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1];
  } else {
    return res.status(401).json({
      message: "Invalid token type",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as TokenData;
    req.userId = decoded.id;
    console.log(req.userId, "this is the user id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
