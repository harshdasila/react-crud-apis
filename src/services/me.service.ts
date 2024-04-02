import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getUserStateData = async(id: number) => {
    try{
        const userStateData = await prisma.um_users.findFirst({
            where:{
                user_id: id,
            },
            select:{
                user_email: true,
                user_id: true,
                user_role_id: true
            }
        })
        return userStateData;
    }
    catch(error){
        console.log(error, "in getting userState Data");
    }
    
} 