/*
  Warnings:

  - Added the required column `CompanyName` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Tone` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email` ADD COLUMN `CompanyName` VARCHAR(191) NOT NULL,
    ADD COLUMN `Tone` VARCHAR(191) NOT NULL;
