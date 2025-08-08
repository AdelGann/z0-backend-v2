/*
  Warnings:

  - A unique constraint covering the columns `[org_id,client_id]` on the table `client_feedbacks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[org_id,doc_num]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[org_id,client_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[founder_id,id]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employee_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "fk_orders_client";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "fk_orders_org";

-- DropIndex
DROP INDEX "client_feedbacks_client_id_key";

-- DropIndex
DROP INDEX "client_feedbacks_org_id_key";

-- DropIndex
DROP INDEX "clients_full_name_key";

-- DropIndex
DROP INDEX "clients_org_id_key";

-- DropIndex
DROP INDEX "debts_org_id_key";

-- DropIndex
DROP INDEX "incomes_org_id_key";

-- DropIndex
DROP INDEX "orders_client_id_key";

-- DropIndex
DROP INDEX "orders_org_id_key";

-- DropIndex
DROP INDEX "orgs_founder_id_key";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "employee_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "unique_org_client_feedback" ON "client_feedbacks"("org_id", "client_id");

-- CreateIndex
CREATE INDEX "idx_org_clients_org_id" ON "clients"("org_id");

-- CreateIndex
CREATE INDEX "idx_org_clients_doc_num" ON "clients"("doc_num");

-- CreateIndex
CREATE UNIQUE INDEX "unique_org_client" ON "clients"("org_id", "doc_num");

-- CreateIndex
CREATE INDEX "idx_org_employees_org_id" ON "employees"("org_id");

-- CreateIndex
CREATE INDEX "idx_org_employees_user_id" ON "employees"("user_id");

-- CreateIndex
CREATE INDEX "idx_org_orders_org_id" ON "orders"("org_id");

-- CreateIndex
CREATE INDEX "idx_org_orders_client_id" ON "orders"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_org_client_order" ON "orders"("org_id", "client_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_org_founder" ON "orgs"("founder_id", "id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_employee" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_org" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
