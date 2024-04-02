"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const me_1 = require("../controllers/me");
const meRouter = (0, express_1.Router)();
meRouter.get('/', me_1.getMyDetails);
exports.default = meRouter;
