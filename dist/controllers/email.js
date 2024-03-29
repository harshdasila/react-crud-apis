"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmailTemp = exports.getEmailTemplate = exports.getAllEmailTemplate = void 0;
const email_service_1 = require("../services/email.service");
const getAllEmailTemplate = async (req, res) => {
    const emailTemplates = await (0, email_service_1.getEmailTemplates)();
    res.status(200).json({
        data: emailTemplates,
    });
};
exports.getAllEmailTemplate = getAllEmailTemplate;
const getEmailTemplate = async (req, res) => {
    const slug = req.body.slug;
    const emailTemplate = await (0, email_service_1.getTemplate)(slug);
    if (emailTemplate) {
        return res.status(200).json({
            message: "Successfully got the data.",
            data: emailTemplate,
        });
    }
    else {
        res.status(404).json({
            message: "Email Template with the given slug not found."
        });
    }
};
exports.getEmailTemplate = getEmailTemplate;
const updateEmailTemp = async (req, res) => {
    const slug = req.body.slug;
    const emailData = req.body.emailData;
    const updatedEmailTempalte = await (0, email_service_1.updateTemplate)(slug, emailData);
    if (updatedEmailTempalte) {
        return res.status(200).json({
            message: "Temaplate Updated Successfully",
            data: updatedEmailTempalte
        });
    }
    else {
        return res.status(404).json({
            message: "Did not update the email template"
        });
    }
};
exports.updateEmailTemp = updateEmailTemp;
