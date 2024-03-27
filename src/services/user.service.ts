import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isUserPresent = async (email: string) => {
  const userPresent = await prisma.um_users.findFirst({
    where: {
      user_email: email,
      user_deleted_at: {
        not: null,
      },
    },
  });
  return userPresent;
};

export const createUser = async (
  email: string,
  name: string,
  mobileNumber: string,
  password: string
) => {
  try {
    const createdUser = await prisma.um_users.create({
      data: {
        user_email: email,
        user_name: name,
        user_number: mobileNumber,
        user_password: password,
      },
    });
    return createdUser;
  } catch (error) {
    throw new Error("Error in creating user.");
  }
};

export const isUserExists = async (email: string, password: string) => {
  try {
    const user = await prisma.um_users.findUnique({
      where: {
        user_email: email,
        user_password: password,
        user_deleted_at: null,
      },
      select: {
        user_id: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error in finding user.");
  }
};

export const deleteUserService = async (userId: number) => {
  try {
    const deletedUser = await prisma.um_users.update({
      where: {
        user_id: userId,
      },
      data: {
        user_deleted_at: new Date().toISOString(),
      },
    });
    // await return deleteUser;
  } catch (e) {
    throw new Error("Error in deleting user.");
  }
};

export const getAllUsers = async () => {
  try {
    const listData = await prisma.um_users.findMany({
      where: {
        user_deleted_at: null,
      },
    });
    return listData;
  } catch (e) {
    throw new Error("Error in fetching data")
  }
};

export const getUserDetails = async(userId: number) => {
  try{
    const userData = await prisma.um_users.findUnique({
      where: {
        user_id: userId,
      },
    });
    return userData;
  }
  catch(e){
    throw new Error("Error in fetching data")
  }
  
}