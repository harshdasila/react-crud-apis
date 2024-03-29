"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTemplate = exports.getTemplate = exports.getEmailTemplates = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getEmailTemplates = async () => {
    try {
        const response = await prisma.um_email_templates.findMany({
            select: {
                et_id: true,
                et_slug: true,
                et_title: true,
            },
        });
        return response;
    }
    catch (error) {
        throw new Error("Error in getting email templates.");
    }
};
exports.getEmailTemplates = getEmailTemplates;
const getTemplate = async (slug) => {
    try {
        const response = await prisma.um_email_templates.findUnique({
            where: {
                et_slug: slug,
            },
            select: {
                et_id: true,
                et_slug: true,
                et_title: true,
                et_content: true,
                et_subject: true,
            },
        });
        return response;
    }
    catch (error) {
        throw new Error("Error in getting email template from slug name.");
    }
};
exports.getTemplate = getTemplate;
const updateTemplate = async (slug, emailData) => {
    try {
        const response = await prisma.um_email_templates.update({
            where: {
                et_slug: slug,
            },
            data: {
                et_content: emailData?.content,
                et_subject: emailData?.subject,
                et_updated_at: new Date(),
            },
        });
        return response;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error in updating email template");
    }
};
exports.updateTemplate = updateTemplate;
