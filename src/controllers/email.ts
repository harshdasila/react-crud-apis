import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getEmailTemplates, getTemplate, updateTemplate } from "../services/email.service";

export const getAllEmailTemplate = async (req: Request, res: Response) => {
  const emailTemplates = await getEmailTemplates();
  res.status(200).json({
    data: emailTemplates,
  });
};

export const getEmailTemplate = async (req: Request, res: Response) => {
  const slug = req.body.slug;
  const emailTemplate = await getTemplate(slug);
  if (emailTemplate) {
    return res.status(200).json({
      message: "Successfully got the data.",
      data: emailTemplate,
    });
  }
  else{
    res.status(404).json({
        message: "Email Template with the given slug not found."
    })
  }
};

export const updateEmailTemp = async (req: Request, res: Response) => {
    const slug = req.body.slug;
    const emailData = req.body.emailData;
    const updatedEmailTempalte = await updateTemplate(slug,emailData);
    if(updatedEmailTempalte){
        return res.status(200).json({
            message: "Temaplate Updated Successfully",
            data: updatedEmailTempalte
        })
    }
    else{
        return res.status(404).json({
            message: "Did not update the email template"
        })
    }
}