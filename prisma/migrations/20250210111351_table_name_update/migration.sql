/*
  Warnings:

  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_projectKey_fkey";

-- DropTable
DROP TABLE "projects";

-- CreateTable
CREATE TABLE "application_config" (
    "projectId" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "application_config_pkey" PRIMARY KEY ("projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "application_config_projectName_key" ON "application_config"("projectName");

-- CreateIndex
CREATE UNIQUE INDEX "application_config_projectKey_key" ON "application_config"("projectKey");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_projectKey_fkey" FOREIGN KEY ("projectKey") REFERENCES "application_config"("projectKey") ON DELETE RESTRICT ON UPDATE CASCADE;
