/*
  Warnings:

  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_clientId_fkey";

-- DropTable
DROP TABLE "clients";

-- CreateTable
CREATE TABLE "application" (
    "clientId" UUID NOT NULL,
    "clientName" TEXT NOT NULL,
    "hashedSecret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "application_pkey" PRIMARY KEY ("clientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "application_clientName_key" ON "application"("clientName");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "application"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
