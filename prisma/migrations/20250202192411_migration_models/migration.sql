/*
  Warnings:

  - You are about to drop the column `ticketTitle` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `projectKey` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketSummary` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "ticketTitle",
ADD COLUMN     "projectKey" TEXT NOT NULL,
ADD COLUMN     "ticketSummary" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Project" (
    "projectId" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectName_key" ON "Project"("projectName");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectKey_key" ON "Project"("projectKey");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_projectKey_fkey" FOREIGN KEY ("projectKey") REFERENCES "Project"("projectKey") ON DELETE RESTRICT ON UPDATE CASCADE;
