"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStateData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserStateData = async (id) => {
    try {
        const userStateData = await prisma.um_users.findFirst({
            where: {
                user_id: id,
            },
            select: {
                user_email: true,
                user_id: true,
                user_role_id: true
            }
        });
        return userStateData;
    }
    catch (error) {
        console.log(error, "in getting userState Data");
    }
};
exports.getUserStateData = getUserStateData;
