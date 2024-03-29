"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const user_1 = require("../controllers/user");
const auth_1 = __importDefault(require("../middleware/auth"));
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
userRouter.get('/list', auth_1.default, user_1.listUsers);
userRouter.post('/list', auth_1.default, user_1.deleteUser);
userRouter.get('/user-details/:userId', auth_1.default, user_1.showUserDetails);
userRouter.put('/update/:userId', auth_1.default, user_1.updateUser);
userRouter.post('/add-user', auth_1.default, user_1.addUser);
exports.default = userRouter;
