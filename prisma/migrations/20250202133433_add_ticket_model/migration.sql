/*
  Warnings:

  - Added the required column `ticketDescription` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketTitle` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "ticketDescription" TEXT NOT NULL,
ADD COLUMN     "ticketTitle" TEXT NOT NULL;
