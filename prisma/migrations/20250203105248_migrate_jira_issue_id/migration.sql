/*
  Warnings:

  - A unique constraint covering the columns `[jiraIssueId]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jiraIssueId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "jiraIssueId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tickets_jiraIssueId_key" ON "tickets"("jiraIssueId");
