-- CreateTable
CREATE TABLE "um_users" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(250) NOT NULL,
    "user_email" VARCHAR(250) NOT NULL,
    "user_password" VARCHAR(250) NOT NULL,
    "user_number" VARCHAR(10) NOT NULL,
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "um_users_user_id_key" ON "um_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "um_users_user_email_key" ON "um_users"("user_email");
