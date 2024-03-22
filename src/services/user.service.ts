import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isUserPresent = async (email: string) => {
  const userPresent = await prisma.um_users.findFirst({
    where: {
      user_email: email,
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

export const isUserExists = async(email:string, password:string) => {
    try{
        const user = await prisma.um_users.findUnique({
            where:{
                user_email: email,
                user_password: password
            },
            select:{
                user_id: true
            }
        })
        return user;
    }
    catch(error){
        throw new Error("Error in finding user.");
    }
    
}
