"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_config_1 = require("../config/index.config");
const signToken = async (userId) => {
    try {
        const jwtToken = jsonwebtoken_1.default.sign({ id: userId }, index_config_1.config.jwt.secret, { expiresIn: '7d' });
        return jwtToken;
    }
    catch (error) {
        console.error('Error in signing JWT token:', error);
        throw new Error('Error in signing JWT token.');
    }
};
exports.signToken = signToken;
