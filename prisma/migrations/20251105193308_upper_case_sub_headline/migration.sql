/*
  Warnings:

  - You are about to drop the column `subheadline` on the `websitedata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `websitedata` DROP COLUMN `subheadline`,
    ADD COLUMN `subHeadline` VARCHAR(191) NULL;
