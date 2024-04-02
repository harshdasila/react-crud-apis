"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetails = exports.getUserDetails = exports.getAllUsers = exports.deleteUserService = exports.isUserExists = exports.createUser = exports.isUserPresent = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const isUserPresent = async (email) => {
    const userPresent = await prisma.um_users.findUnique({
        where: {
            user_email: email,
            user_deleted_at: null
        },
    });
    return userPresent;
};
exports.isUserPresent = isUserPresent;
const createUser = async (email, name, mobileNumber, password, userRole = 5) => {
    try {
        const createdUser = await prisma.um_users.create({
            data: {
                user_email: email,
                user_name: name,
                user_number: mobileNumber,
                user_password: password,
                user_role_id: userRole
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
                // user_password: password,
                user_deleted_at: null,
            },
            select: {
                user_id: true,
                user_role_id: true,
                user_password: true,
            },
        });
        const passwordMatch = await bcrypt_1.default.compare(password, user.user_password);
        if (passwordMatch) {
            return user;
        }
        else {
            return false;
        }
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
const getAllUsers = async (sortBy, sortOrder, searchQuery, recordsPerPage, page) => {
    try {
        const listData = await prisma.um_users.findMany({
            where: {
                user_deleted_at: null,
                OR: [
                    { user_name: { contains: searchQuery } },
                    { user_email: { contains: searchQuery } },
                    { user_number: { contains: searchQuery } },
                ],
            },
            orderBy: {
                [sortBy]: sortOrder,
            },
            take: recordsPerPage,
            skip: (page - 1) * recordsPerPage,
        });
        const totalUser = await prisma.um_users.findMany({
            where: {
                user_deleted_at: null,
                OR: [
                    { user_name: { contains: searchQuery } },
                    { user_email: { contains: searchQuery } },
                    { user_number: { contains: searchQuery } },
                ],
            },
            orderBy: {
                [sortBy]: sortOrder,
            },
        });
        return { listData, totalUser };
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
const updateUserDetails = async (userId, body) => {
    try {
        const userData = await prisma.um_users.update({
            where: {
                user_id: userId,
            },
            data: {
                user_email: body.email,
                user_name: body.name,
                user_number: body.number,
                user_role_id: Number(body.roleId)
            }
        });
        return userData;
    }
    catch (error) {
        console.error('Error updating user details:', error);
        throw new Error('Failed to update user details');
    }
};
exports.updateUserDetails = updateUserDetails;
