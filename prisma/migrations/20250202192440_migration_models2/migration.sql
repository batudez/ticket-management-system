/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_projectKey_fkey";

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "projects" (
    "projectId" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_projectName_key" ON "projects"("projectName");

-- CreateIndex
CREATE UNIQUE INDEX "projects_projectKey_key" ON "projects"("projectKey");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_projectKey_fkey" FOREIGN KEY ("projectKey") REFERENCES "projects"("projectKey") ON DELETE RESTRICT ON UPDATE CASCADE;
