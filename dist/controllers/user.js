"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.updateUser = exports.showUserDetails = exports.deleteUser = exports.listUsers = void 0;
const client_1 = require("@prisma/client");
const user_service_1 = require("../services/user.service");
const schema_1 = require("../schema");
const prisma = new client_1.PrismaClient();
const listUsers = async (req, res) => {
    const sortBy = req?.query?.sortBy
        ? String(req.query.sortBy)
        : "user_created_at";
    const sortOrder = req?.query?.sortOrder
        ? String(req.query.sortOrder)
        : "desc";
    const searchQuery = req?.query?.searchQuery
        ? String(req.query.searchQuery)
        : "";
    const recordsPerPage = req?.query?.recordsPerPage
        ? Number(req.query.recordsPerPage)
        : 5;
    const page = req?.query?.page ? Number(req?.query?.page) : 1;
    try {
        const { listData, totalUser } = await (0, user_service_1.getAllUsers)(sortBy, sortOrder, searchQuery, recordsPerPage, page);
        res.status(200).json({
            list: listData,
            totalUsers: totalUser.length,
        });
    }
    catch (e) {
        console.log(e);
        res.status(402).json({
            message: "Error in fetching data from backend",
        });
    }
};
exports.listUsers = listUsers;
const deleteUser = async (req, res) => {
    const userId = Number(req.params.userId);
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
const updateUser = async (req, res) => {
    try {
        const body = req.body;
        const userId = Number(req.params.userId);
        const updatedUser = await (0, user_service_1.updateUserDetails)(userId, body);
        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        console.error("Error updating user details:", error);
        throw new Error("Failed to update user details");
    }
};
exports.updateUser = updateUser;
const addUser = async (req, res) => {
    try {
        const data = req.body;
        const { email, password, name, mobileNumber, userRole } = data;
        const addUserData = {
            name,
            email,
            password,
            mobileNumber,
            userRole,
        };
        const validationResult = schema_1.signUpSchema.safeParse(addUserData);
        if (!validationResult.success) {
            res.status(422);
            return res.json({
                message: "Invalid Input Types",
                errors: validationResult.error.errors, // Optionally send the validation errors
            });
        }
        const userPresent = await (0, user_service_1.isUserPresent)(email);
        if (userPresent) {
            return res.status(409).json({
                message: `User with email - ${email} already present.`,
            });
        }
        else {
            const user = await (0, user_service_1.createUser)(email, name, mobileNumber, password, userRole);
            const userID = user.user_id;
            const user_role_id = user.user_role_id;
            return res.status(200).json({
                message: "User Added Successfully.",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "Error occurred"
        });
    }
};
exports.addUser = addUser;
