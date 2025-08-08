-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "employeesId" TEXT;

-- AlterTable
ALTER TABLE "debts" ADD COLUMN     "employee_id" TEXT;

-- AlterTable
ALTER TABLE "incomes" ADD COLUMN     "employee_id" TEXT;

-- CreateIndex
CREATE INDEX "idx_debts_employee_id" ON "debts"("employee_id");

-- CreateIndex
CREATE INDEX "idx_incomes_employee_id" ON "incomes"("employee_id");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_employeesId_fkey" FOREIGN KEY ("employeesId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debts" ADD CONSTRAINT "debts_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
