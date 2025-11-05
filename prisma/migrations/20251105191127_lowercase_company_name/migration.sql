/*
  Warnings:

  - You are about to drop the column `CompanyName` on the `email` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email` DROP COLUMN `CompanyName`,
    ADD COLUMN `companyName` VARCHAR(191) NOT NULL;
