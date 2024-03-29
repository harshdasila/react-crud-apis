/*
  Warnings:

  - A unique constraint covering the columns `[role_slug]` on the table `um_roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "um_email_templates" (
    "et_id" SERIAL NOT NULL,
    "et_slug" VARCHAR(155) NOT NULL,
    "et_title" VARCHAR(255) NOT NULL,
    "et_subject" VARCHAR(255) NOT NULL,
    "et_content" VARCHAR(5000) NOT NULL,
    "et_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "et_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "et_deleted_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "um_email_templates_et_id_key" ON "um_email_templates"("et_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_email_templates_et_slug_key" ON "um_email_templates"("et_slug");

-- CreateIndex
CREATE UNIQUE INDEX "um_roles_role_slug_key" ON "um_roles"("role_slug");
