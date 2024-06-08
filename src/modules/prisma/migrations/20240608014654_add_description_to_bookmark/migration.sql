/*
  Warnings:

  - Added the required column `description` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "description" VARCHAR(100) NOT NULL;
