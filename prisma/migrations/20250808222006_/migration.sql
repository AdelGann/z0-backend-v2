/*
  Warnings:

  - The values [Bs,Dls,Eur] on the enum `Money` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Money_new" AS ENUM ('BS', 'DLS', 'EUR');
ALTER TABLE "public"."debts" ALTER COLUMN "money_type" TYPE "public"."Money_new" USING ("money_type"::text::"public"."Money_new");
ALTER TABLE "public"."incomes" ALTER COLUMN "money_type" TYPE "public"."Money_new" USING ("money_type"::text::"public"."Money_new");
ALTER TABLE "public"."orders" ALTER COLUMN "money_type" TYPE "public"."Money_new" USING ("money_type"::text::"public"."Money_new");
ALTER TABLE "public"."products" ALTER COLUMN "money_type" TYPE "public"."Money_new" USING ("money_type"::text::"public"."Money_new");
ALTER TYPE "public"."Money" RENAME TO "Money_old";
ALTER TYPE "public"."Money_new" RENAME TO "Money";
DROP TYPE "public"."Money_old";
COMMIT;
