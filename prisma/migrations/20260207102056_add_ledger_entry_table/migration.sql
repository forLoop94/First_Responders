/*
  Warnings:

  - You are about to drop the column `inventoryId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the `finances` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LedgerType" AS ENUM ('CREDIT', 'DEBIT');

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_inventoryId_fkey";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "inventoryId";

-- DropTable
DROP TABLE "finances";

-- CreateTable
CREATE TABLE "LedgerEntry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "LedgerType" NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "description" TEXT,
    "reference" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LedgerEntry_pkey" PRIMARY KEY ("id")
);
