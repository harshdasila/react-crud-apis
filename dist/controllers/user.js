"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const listUsers = async (req, res) => {
    //yaha tlogic to get data from 3rd party api for now
    res.status(200).json({
        message: "successfully reached list users"
    });
};
exports.listUsers = listUsers;
