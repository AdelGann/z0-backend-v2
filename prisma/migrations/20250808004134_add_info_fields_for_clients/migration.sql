/*
  Warnings:

  - You are about to drop the column `employeesId` on the `clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."clients" DROP CONSTRAINT "clients_employeesId_fkey";

-- AlterTable
ALTER TABLE "public"."clients" DROP COLUMN "employeesId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "employee_id" TEXT,
ADD COLUMN     "phone_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "public"."clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_phone_number_key" ON "public"."clients"("phone_number");

-- AddForeignKey
ALTER TABLE "public"."clients" ADD CONSTRAINT "clients_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
