-- AlterTable
ALTER TABLE `email` ADD COLUMN `emailType` ENUM('TEMPLATE', 'WEBSITE_PERSONALIZED', 'LINKEDIN_PERSONALIZED') NOT NULL DEFAULT 'TEMPLATE';

-- CreateTable
CREATE TABLE `WebsiteData` (
    `id` VARCHAR(191) NOT NULL,
    `emailId` VARCHAR(191) NOT NULL,
    `domain` VARCHAR(191) NOT NULL,
    `headline` VARCHAR(191) NULL,
    `subheadline` VARCHAR(191) NULL,
    `pageText` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `WebsiteData_emailId_key`(`emailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WebsiteData` ADD CONSTRAINT `WebsiteData_emailId_fkey` FOREIGN KEY (`emailId`) REFERENCES `Email`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
