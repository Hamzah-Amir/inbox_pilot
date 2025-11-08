/*
  Warnings:

  - You are about to drop the column `output` on the `email` table. All the data in the column will be lost.
  - Added the required column `body` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email` DROP COLUMN `output`,
    ADD COLUMN `body` TEXT NOT NULL,
    ADD COLUMN `closing` TEXT NOT NULL,
    ADD COLUMN `intro` TEXT NOT NULL,
    ADD COLUMN `subject` VARCHAR(191) NOT NULL;
