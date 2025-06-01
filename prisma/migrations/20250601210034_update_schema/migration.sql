-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('credit', 'debit', 'transference', 'mobile_pay', 'cash');

-- CreateEnum
CREATE TYPE "Money" AS ENUM ('Bs', 'Dls', 'Eur');

-- CreateEnum
CREATE TYPE "InvitationState" AS ENUM ('PENDING', 'CANCELED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "client_feedbacks" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "rating" BIGINT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "doc_num" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debt_types" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "debt_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debts" (
    "id" TEXT NOT NULL,
    "debt_type" VARCHAR(20) NOT NULL,
    "payment_type" "PaymentType" NOT NULL,
    "money_type" "Money" NOT NULL,
    "amount" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "debt_type_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "debts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "doc_num" TEXT,
    "role" "Roles" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "income_types" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "income_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomes" (
    "id" TEXT NOT NULL,
    "income_type" VARCHAR(20) NOT NULL,
    "payment_type" "PaymentType" NOT NULL,
    "money_type" "Money" NOT NULL,
    "amount" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "income_type_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "incomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metrics" (
    "id" TEXT NOT NULL,
    "month" BIGINT NOT NULL,
    "year" BIGINT NOT NULL,
    "total_income" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_debts" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "income_count" BIGINT NOT NULL DEFAULT 0,
    "debt_count" BIGINT NOT NULL DEFAULT 0,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "total_amount" DOUBLE PRECISION,
    "payment_type" "PaymentType" NOT NULL,
    "money_type" "Money" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "org_invitations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "state" "InvitationState" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "org_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "founder_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" BIGINT,
    "price" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "order_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" BIGINT NOT NULL,
    "dirty" BOOLEAN NOT NULL,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "role" "Roles" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_feedbacks_id_key" ON "client_feedbacks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "client_feedbacks_client_id_key" ON "client_feedbacks"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "client_feedbacks_org_id_key" ON "client_feedbacks"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_org_id_key" ON "clients"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "uni_clients_doc_num" ON "clients"("doc_num");

-- CreateIndex
CREATE UNIQUE INDEX "uni_clients_full_name" ON "clients"("full_name");

-- CreateIndex
CREATE UNIQUE INDEX "debt_types_id_key" ON "debt_types"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uni_debt_types_name" ON "debt_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "debts_id_key" ON "debts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uni_debts_debt_type_id" ON "debts"("debt_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "debts_org_id_key" ON "debts"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_id_key" ON "employees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_org_id_key" ON "employees"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_id_key" ON "employees"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "uni_employees_doc_num" ON "employees"("doc_num");

-- CreateIndex
CREATE UNIQUE INDEX "income_types_id_key" ON "income_types"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uni_income_types_name" ON "income_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "incomes_id_key" ON "incomes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uni_incomes_income_type_id" ON "incomes"("income_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "incomes_org_id_key" ON "incomes"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "metrics_id_key" ON "metrics"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uni_metrics_org_id" ON "metrics"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_org_id_key" ON "orders"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_client_id_key" ON "orders"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "org_invitations_id_key" ON "org_invitations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "org_invitations_user_id_key" ON "org_invitations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "org_invitations_org_id_key" ON "org_invitations"("org_id");

-- CreateIndex
CREATE INDEX "idx_org_invitations_org_id" ON "org_invitations"("org_id");

-- CreateIndex
CREATE INDEX "idx_org_invitations_user_id" ON "org_invitations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_id_key" ON "orgs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_founder_id_key" ON "orgs"("founder_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_org_id_key" ON "products"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_order_id_key" ON "products"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uni_users_user_name" ON "users"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "uni_users_email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "client_feedbacks" ADD CONSTRAINT "fk_clients_feedbacks" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_feedbacks" ADD CONSTRAINT "fk_orgs_feedbacks" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "fk_orgs_clients" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "debts" ADD CONSTRAINT "fk_debts_debt_type" FOREIGN KEY ("debt_type_id") REFERENCES "debt_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "debts" ADD CONSTRAINT "fk_orgs_debts" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "fk_orgs_employees" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "fk_users_employees" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "fk_incomes_income_type" FOREIGN KEY ("income_type_id") REFERENCES "income_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "fk_orgs_incomes" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "metrics" ADD CONSTRAINT "fk_orgs_metrics" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_org" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "org_invitations" ADD CONSTRAINT "fk_orgs_invitations" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "org_invitations" ADD CONSTRAINT "fk_users_invitations" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "fk_users_organizations" FOREIGN KEY ("founder_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_orders_products" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_orgs_products" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
