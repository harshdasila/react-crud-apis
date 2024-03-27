"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.getAllUsers = exports.deleteUserService = exports.isUserExists = exports.createUser = exports.isUserPresent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isUserPresent = async (email) => {
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
                user_password: password,
                user_deleted_at: null,
            },
            select: {
                user_id: true,
            },
        });
        return user;
    }
    catch (error) {
        throw new Error("Error in finding user.");
    }
};
exports.isUserExists = isUserExists;
const deleteUserService = async (userId) => {
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
    }
    catch (e) {
        throw new Error("Error in deleting user.");
    }
};
exports.deleteUserService = deleteUserService;
const getAllUsers = async () => {
    try {
        const listData = await prisma.um_users.findMany({
            where: {
                user_deleted_at: null,
            },
        });
        return listData;
    }
    catch (e) {
        throw new Error("Error in fetching data");
    }
};
exports.getAllUsers = getAllUsers;
const getUserDetails = async (userId) => {
    try {
        const userData = await prisma.um_users.findUnique({
            where: {
                user_id: userId,
            },
        });
        return userData;
    }
    catch (e) {
        throw new Error("Error in fetching data");
    }
};
exports.getUserDetails = getUserDetails;
