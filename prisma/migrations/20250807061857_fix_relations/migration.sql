-- DropIndex
DROP INDEX "debts_debt_type_id_key";

-- DropIndex
DROP INDEX "incomes_income_type_id_key";

-- CreateIndex
CREATE INDEX "idx_incomes_income_type_id" ON "incomes"("income_type_id");
