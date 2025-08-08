/*
  Warnings:

  - You are about to drop the column `debt_type_id` on the `debts` table. All the data in the column will be lost.
  - You are about to drop the column `income_type_id` on the `incomes` table. All the data in the column will be lost.
  - You are about to drop the `debt_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `income_types` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[org_id,employee_id]` on the table `debts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[org_id,employee_id]` on the table `incomes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PAID');

-- DropForeignKey
ALTER TABLE "public"."debts" DROP CONSTRAINT "fk_debts_debt_type";

-- DropForeignKey
ALTER TABLE "public"."incomes" DROP CONSTRAINT "fk_incomes_income_type";

-- DropIndex
DROP INDEX "public"."idx_debts_employee_id";

-- DropIndex
DROP INDEX "public"."idx_incomes_employee_id";

-- DropIndex
DROP INDEX "public"."idx_incomes_income_type_id";

-- AlterTable
ALTER TABLE "public"."debts" DROP COLUMN "debt_type_id",
ADD COLUMN     "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."incomes" DROP COLUMN "income_type_id",
ADD COLUMN     "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "public"."debt_types";

-- DropTable
DROP TABLE "public"."income_types";

-- CreateIndex
CREATE INDEX "idx_debts_employee_id_org_id" ON "public"."debts"("employee_id", "org_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_org_employee_debt" ON "public"."debts"("org_id", "employee_id");

-- CreateIndex
CREATE INDEX "idx_incomes_employee_id_org_id" ON "public"."incomes"("employee_id", "org_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_org_employee_income" ON "public"."incomes"("org_id", "employee_id");
