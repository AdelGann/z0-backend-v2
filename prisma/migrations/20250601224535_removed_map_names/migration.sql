-- RenameIndex
ALTER INDEX "uni_clients_doc_num" RENAME TO "clients_doc_num_key";

-- RenameIndex
ALTER INDEX "uni_clients_full_name" RENAME TO "clients_full_name_key";

-- RenameIndex
ALTER INDEX "uni_debt_types_name" RENAME TO "debt_types_name_key";

-- RenameIndex
ALTER INDEX "uni_debts_debt_type_id" RENAME TO "debts_debt_type_id_key";

-- RenameIndex
ALTER INDEX "uni_employees_doc_num" RENAME TO "employees_doc_num_key";

-- RenameIndex
ALTER INDEX "uni_income_types_name" RENAME TO "income_types_name_key";

-- RenameIndex
ALTER INDEX "uni_incomes_income_type_id" RENAME TO "incomes_income_type_id_key";

-- RenameIndex
ALTER INDEX "uni_metrics_org_id" RENAME TO "metrics_org_id_key";

-- RenameIndex
ALTER INDEX "uni_users_email" RENAME TO "users_email_key";

-- RenameIndex
ALTER INDEX "uni_users_user_name" RENAME TO "users_user_name_key";
