/*
  Warnings:

  - A unique constraint covering the columns `[org_id,user_id]` on the table `org_invitations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "org_invitations_org_id_key";

-- DropIndex
DROP INDEX "org_invitations_user_id_key";

-- DropIndex
DROP INDEX "products_org_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "unique_org_user_inv" ON "org_invitations"("org_id", "user_id");
