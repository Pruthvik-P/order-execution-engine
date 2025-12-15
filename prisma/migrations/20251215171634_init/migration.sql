-- CreateEnum
CREATE TYPE "order_status_enum" AS ENUM ('PENDING', 'ROUTING', 'BUILDING', 'SUBMITTED', 'CONFIRMED', 'FAILED');

-- CreateEnum
CREATE TYPE "order_type_enum" AS ENUM ('MARKET', 'LIMIT', 'SNIPER');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "order_type_enum" NOT NULL DEFAULT 'MARKET',
    "token_in" TEXT NOT NULL,
    "token_out" TEXT NOT NULL,
    "amount" DECIMAL(20,8) NOT NULL,
    "slippage" DECIMAL(5,4) NOT NULL DEFAULT 0.01,
    "limit_price" DECIMAL(20,8),
    "status" "order_status_enum" NOT NULL DEFAULT 'PENDING',
    "dex" TEXT,
    "executed_price" DECIMAL(20,8),
    "tx_hash" TEXT,
    "error" TEXT,
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_audit_logs" (
    "id" SERIAL NOT NULL,
    "order_id" TEXT NOT NULL,
    "old_status" "order_status_enum",
    "new_status" "order_status_enum" NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "orders"("user_id");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_created_at_idx" ON "orders"("created_at");

-- CreateIndex
CREATE INDEX "orders_dex_idx" ON "orders"("dex");

-- CreateIndex
CREATE INDEX "order_audit_logs_order_id_idx" ON "order_audit_logs"("order_id");

-- CreateIndex
CREATE INDEX "order_audit_logs_created_at_idx" ON "order_audit_logs"("created_at");

-- AddForeignKey
ALTER TABLE "order_audit_logs" ADD CONSTRAINT "order_audit_logs_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
