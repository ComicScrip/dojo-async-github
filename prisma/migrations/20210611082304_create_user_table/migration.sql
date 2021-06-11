-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `githubUsername` VARCHAR(255) NOT NULL,
    `reposLastSyncDate` DATETIME NOT NULL,

    UNIQUE INDEX `user.reposLastSyncDate_unique`(`reposLastSyncDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
