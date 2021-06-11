/*
  Warnings:

  - You are about to alter the column `reposLastSyncDate` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `reposLastSyncDate` DATETIME;
