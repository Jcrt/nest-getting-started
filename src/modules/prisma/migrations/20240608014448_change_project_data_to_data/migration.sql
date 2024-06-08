/*
  Warnings:

  - You are about to drop the column `projectData` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `data` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "projectData",
ADD COLUMN     "data" JSON NOT NULL;
