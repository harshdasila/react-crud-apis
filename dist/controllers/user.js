"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showUserDetails = exports.deleteUser = exports.listUsers = void 0;
const client_1 = require("@prisma/client");
const user_service_1 = require("../services/user.service");
const prisma = new client_1.PrismaClient();
const listUsers = async (req, res) => {
    try {
        const listData = await (0, user_service_1.getAllUsers)();
        res.status(200).json({
            list: listData,
        });
    }
    catch (e) {
        res.status(402).json({
            message: "Error in fetching data from backend",
        });
    }
};
exports.listUsers = listUsers;
const deleteUser = async (req, res) => {
    const userId = req.body.userId;
    try {
        const deletedUser = (0, user_service_1.deleteUserService)(userId);
        res.status(200).json({
            message: "User deleted Successfully",
        });
    }
    catch (e) {
        console.error("Error deleting user:", e);
        res.status(401).json({
            message: "Error in deleting user",
        });
    }
};
exports.deleteUser = deleteUser;
const showUserDetails = async (req, res) => {
    const userId = Number(req.params.userId);
    const userData = await (0, user_service_1.getUserDetails)(userId);
    res.status(200).json({
        data: userData,
    });
};
exports.showUserDetails = showUserDetails;
