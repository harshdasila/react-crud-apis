-- AlterTable
ALTER TABLE "um_users" ADD COLUMN     "um_role_id" INTEGER;

-- CreateTable
CREATE TABLE "um_roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(255) NOT NULL,
    "role_slug" VARCHAR(155) NOT NULL,
    "role_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_deleted_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "um_roles_role_id_key" ON "um_roles"("role_id");

-- AddForeignKey
ALTER TABLE "um_users" ADD CONSTRAINT "um_users_um_role_id_fkey" FOREIGN KEY ("um_role_id") REFERENCES "um_roles"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;
