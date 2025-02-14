/*
  Warnings:

  - Added the required column `maxTicketValue` to the `application_config` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketValue` to the `application_config` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "application_config" ADD COLUMN     "maxTicketValue" INTEGER NOT NULL,
ADD COLUMN     "ticketValue" INTEGER NOT NULL;
