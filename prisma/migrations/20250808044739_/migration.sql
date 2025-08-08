/*
  Warnings:

  - You are about to drop the column `order_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "fk_orders_products";

-- DropIndex
DROP INDEX "public"."products_order_id_key";

-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "order_id";

-- CreateTable
CREATE TABLE "public"."order_items" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_order_items_order_id" ON "public"."order_items"("order_id");

-- CreateIndex
CREATE INDEX "idx_order_items_product_id" ON "public"."order_items"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_order_product" ON "public"."order_items"("order_id", "product_id");

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "fk_order_items_order" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "fk_order_items_product" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
