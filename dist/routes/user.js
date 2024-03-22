"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
userRouter.get('/list', user_1.listUsers);
exports.default = userRouter;
