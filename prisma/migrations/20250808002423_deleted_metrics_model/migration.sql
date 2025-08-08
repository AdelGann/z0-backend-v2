/*
  Warnings:

  - You are about to drop the `metrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."metrics" DROP CONSTRAINT "fk_orgs_metrics";

-- DropTable
DROP TABLE "public"."metrics";
