"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = require("../controllers/email");
const emailRouter = (0, express_1.Router)();
emailRouter.get('/', email_1.getAllEmailTemplate);
emailRouter.post('/data', email_1.getEmailTemplate);
emailRouter.put('/edit', email_1.updateEmailTemp);
exports.default = emailRouter;
