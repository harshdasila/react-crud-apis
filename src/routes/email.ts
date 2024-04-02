import { Router, Request, Response } from "express";
import {
  getAllEmailTemplate,
  getEmailTemplate,
  updateEmailTemp,
} from "../controllers/email";

const emailRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Email Templates
 *     description: APIs related to Email Templates
 */

/**
 * @openapi
 * /email-template:
 *   get:
 *     tags:
 *       - Email Templates
 *     description: Get all email templates
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Returns all email templates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       et_id:
 *                         type: integer
 *                       et_slug:
 *                         type: string
 *                       et_title:
 *                         type: string
 *       '500':
 *         description: Internal Server Error. Error occurred while fetching email templates.
 */

emailRouter.get("/", getAllEmailTemplate);

/**
 * @openapi
 * /email-template/data:
 *   post:
 *     tags:
 *       - Email Templates
 *     description: Get email template by slug
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the email template
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     // Define the structure of your email template object here
 *       '404':
 *         description: Email Template not found for the given slug
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

emailRouter.post("/data", getEmailTemplate);

/**
 * @openapi
 * /email-template/edit:
 *   put:
 *     tags:
 *       - Email Templates
 *     summary: Update Email Template
 *     description: Update an existing email template by slug
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *               emailData:
 *                 type: object
 *                 description: Object containing updated email data
 *     responses:
 *       '200':
 *         description: Template Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '404':
 *         description: Email Template Not Found or Not Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

emailRouter.put("/edit", updateEmailTemp);

export default emailRouter;
