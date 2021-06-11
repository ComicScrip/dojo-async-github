/*
  Warnings:

  - You are about to alter the column `reposLastSyncDate` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[url]` on the table `repository` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `reposLastSyncDate` DATETIME;

-- CreateIndex
CREATE UNIQUE INDEX `repository.url_unique` ON `repository`(`url`);
