"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserExists = exports.createUser = exports.isUserPresent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isUserPresent = async (email) => {
    const userPresent = await prisma.um_users.findFirst({
        where: {
            user_email: email,
        },
    });
    return userPresent;
};
exports.isUserPresent = isUserPresent;
const createUser = async (email, name, mobileNumber, password) => {
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
    }
    catch (error) {
        throw new Error("Error in creating user.");
    }
};
exports.createUser = createUser;
const isUserExists = async (email, password) => {
    try {
        const user = await prisma.um_users.findUnique({
            where: {
                user_email: email,
                user_password: password
            },
            select: {
                user_id: true
            }
        });
        return user;
    }
    catch (error) {
        throw new Error("Error in finding user.");
    }
};
exports.isUserExists = isUserExists;
