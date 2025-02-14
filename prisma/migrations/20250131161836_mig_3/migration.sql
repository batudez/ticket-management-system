/*
  Warnings:

  - You are about to drop the column `clientSecret` on the `clients` table. All the data in the column will be lost.
  - Added the required column `hashedSecret` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "clientSecret",
ADD COLUMN     "hashedSecret" TEXT NOT NULL;
