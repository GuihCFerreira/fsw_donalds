/*
  Warnings:

  - Added the required column `consumerCpf` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consumerName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "consumerCpf" TEXT NOT NULL,
ADD COLUMN     "consumerName" TEXT NOT NULL;
