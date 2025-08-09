/*
  Warnings:

  - You are about to alter the column `rating` on the `client_feedbacks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."client_feedbacks" ALTER COLUMN "rating" SET DATA TYPE INTEGER;
