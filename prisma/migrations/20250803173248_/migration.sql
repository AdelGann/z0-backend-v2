/*
  Warnings:

  - A unique constraint covering the columns `[org_id,id,code]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "idx_org_products_org_id" ON "products"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_org_product_code" ON "products"("org_id", "id", "code");
