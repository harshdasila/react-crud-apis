"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_config_1 = require("../config/index.config");
const authMiddleware = (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    let token = "";
    if (authHeaders && authHeaders.startsWith("Bearer")) {
        token = authHeaders.split(" ")[1];
    }
    else {
        return res.status(401).json({
            message: "Invalid token type",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, index_config_1.config.jwt.secret);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};
exports.default = authMiddleware;
