-- CreateTable
CREATE TABLE `EmailQuality` (
    `id` VARCHAR(191) NOT NULL,
    `emailId` VARCHAR(191) NOT NULL,
    `personalizationScore` INTEGER NOT NULL,
    `websiteContextScore` INTEGER NOT NULL,
    `readabilityGrade` DOUBLE NOT NULL,
    `toneMatched` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EmailQuality_emailId_key`(`emailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmailQuality` ADD CONSTRAINT `EmailQuality_emailId_fkey` FOREIGN KEY (`emailId`) REFERENCES `Email`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
