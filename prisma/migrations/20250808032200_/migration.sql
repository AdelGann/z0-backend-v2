-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "public"."clients" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE';
