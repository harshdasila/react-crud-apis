-- AlterTable
ALTER TABLE "um_email_templates" ALTER COLUMN "et_updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "um_roles" ALTER COLUMN "role_updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "um_users" ALTER COLUMN "user_updated_at" DROP DEFAULT;
