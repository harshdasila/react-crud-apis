"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyDetails = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const me_service_1 = require("../services/me.service");
const getMyDetails = async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.json({
            message: "didnt got the token"
        });
    }
    const token = authHeader && authHeader.split(" ")[1] || "";
    const decoded = jsonwebtoken_1.default.decode(token); // Type assertion
    const id = decoded.id;
    console.log(id, "idddd");
    const userStateData = await (0, me_service_1.getUserStateData)(id);
    const stateData = {
        id: userStateData?.user_id,
        role_id: userStateData?.user_role_id
    };
    if (userStateData) {
        return res.status(200).json({
            stateData
        });
    }
    else {
        return res.status(404).json({
            message: "Error in fetching userState Data."
        });
    }
};
exports.getMyDetails = getMyDetails;
