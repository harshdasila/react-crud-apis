"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_users = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const add_users = async (prisma) => {
    const saltRounds = 10;
    const superUser = await prisma.um_users.findFirst({
        where: {
            user_role_id: 1
        }
    });
    if (!superUser?.user_id) {
        await prisma.um_users.create({
            data: {
                user_name: "Super Admin",
                user_email: "super@gmail.com",
                user_password: await bcrypt_1.default.hash("Super@2222", saltRounds),
                user_number: "1111111111",
                user_role_id: 1
            },
        });
    }
    const adminUser = await prisma.um_users.findFirst({
        where: {
            user_role_id: 2
        }
    });
    if (!adminUser?.user_id) {
        await prisma.um_users.create({
            data: {
                user_name: "Admin",
                user_email: "admin@gmail.com",
                user_password: await bcrypt_1.default.hash("Admin@2222", saltRounds),
                user_number: "2222222222",
                user_role_id: 2
            },
        });
    }
};
exports.add_users = add_users;
