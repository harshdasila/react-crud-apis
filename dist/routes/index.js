"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const auth_2 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const rootRouter = (0, express_1.Router)();
rootRouter.use('/auth', auth_2.default);
rootRouter.use('/user', auth_1.default, user_1.default);
exports.default = rootRouter;
