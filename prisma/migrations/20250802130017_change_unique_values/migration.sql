/*
  Warnings:

  - A unique constraint covering the columns `[org_id,user_id]` on the table `employees` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "employees_org_id_key";

-- DropIndex
DROP INDEX "employees_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "unique_org_user" ON "employees"("org_id", "user_id");
