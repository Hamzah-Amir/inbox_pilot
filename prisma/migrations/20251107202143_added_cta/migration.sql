/*
  Warnings:

  - Added the required column `cta` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email` ADD COLUMN `cta` TEXT NOT NULL;
