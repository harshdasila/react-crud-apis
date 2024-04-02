/*
  Warnings:

  - You are about to drop the column `um_role_id` on the `um_users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "um_users" DROP CONSTRAINT "um_users_um_role_id_fkey";

-- AlterTable
ALTER TABLE "um_users" DROP COLUMN "um_role_id",
ADD COLUMN     "user_role_id" INTEGER;

-- AddForeignKey
ALTER TABLE "um_users" ADD CONSTRAINT "um_users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "um_roles"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;
