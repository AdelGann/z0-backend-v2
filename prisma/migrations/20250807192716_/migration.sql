/*
  Warnings:

  - You are about to drop the column `update_at` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."clients" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."orders" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3);
