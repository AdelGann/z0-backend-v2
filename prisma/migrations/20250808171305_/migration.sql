/*
  Warnings:

  - Made the column `quantity` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `money_type` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."products" ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "money_type" SET NOT NULL;
