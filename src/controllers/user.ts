import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { deleteUserService, getAllUsers, getUserDetails } from "../services/user.service";

const prisma = new PrismaClient();

export const listUsers = async (req: Request, res: Response) => {
  try {
    const listData = await getAllUsers();

    res.status(200).json({
      list: listData,
    });
  } catch (e) {
    res.status(402).json({
      message: "Error in fetching data from backend",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  try {
    const deletedUser = deleteUserService(userId);
    res.status(200).json({
      message: "User deleted Successfully",
    });
  } catch (e) {
    console.error("Error deleting user:", e);
    res.status(401).json({
      message: "Error in deleting user",
    });
  }
};

export const showUserDetails = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const userData = await getUserDetails(userId)
  res.status(200).json({
    data: userData,
  });
};
