-- AlterTable
ALTER TABLE "programs" ADD COLUMN     "unitCost" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "stocks" ADD COLUMN     "unitCost" DECIMAL(10,2) NOT NULL DEFAULT 0;
