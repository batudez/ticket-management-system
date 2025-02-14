/*
  Warnings:

  - You are about to drop the column `ticketDescription` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `ticketSummary` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `description` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "ticketDescription",
DROP COLUMN "ticketSummary",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;
