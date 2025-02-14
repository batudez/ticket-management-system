-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('TASK', 'BUG', 'STORY');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('IN_PROGRESS', 'RESOLVED', 'TO_DO');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "tickets" (
    "ticketId" UUID NOT NULL,
    "issueType" "IssueType" NOT NULL,
    "ticketStatus" "TicketStatus" NOT NULL,
    "priority" "Priority" NOT NULL,
    "issueCreatedBy" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticketId")
);

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
