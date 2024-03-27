-- AlterTable
ALTER TABLE "um_users" ALTER COLUMN "user_deleted_at" DROP NOT NULL,
ALTER COLUMN "user_deleted_at" DROP DEFAULT;
