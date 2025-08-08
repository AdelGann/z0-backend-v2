/*
  Warnings:

  - A unique constraint covering the columns `[org_id,id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unique_org_product" ON "products"("org_id", "id");
