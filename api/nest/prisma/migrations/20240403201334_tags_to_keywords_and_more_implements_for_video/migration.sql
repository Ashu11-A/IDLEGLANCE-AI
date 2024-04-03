/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `name` on the `Video` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFamilySafe` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lengthSeconds` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishDate` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tags_uuid_key";

-- DropIndex
DROP INDEX "Tags_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tags";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Keywords" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_KeywordsToVideo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_KeywordsToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Keywords" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_KeywordsToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lengthSeconds" INTEGER NOT NULL,
    "isFamilySafe" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT,
    "maxQuality" TEXT,
    "subtitle" TEXT,
    "subtitleSource" TEXT,
    "musicAuthor" TEXT,
    "musicStyle" TEXT,
    "videoEditor" TEXT,
    "editStyle" TEXT,
    "isAnime" BOOLEAN DEFAULT true,
    "similarThumbnailId" INTEGER,
    CONSTRAINT "Video_similarThumbnailId_fkey" FOREIGN KEY ("similarThumbnailId") REFERENCES "SimilarThumbnails" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("description", "editStyle", "id", "isAnime", "maxQuality", "musicAuthor", "musicStyle", "similarThumbnailId", "subtitle", "subtitleSource", "thumbnail", "uuid", "videoEditor", "youtubeId") SELECT "description", "editStyle", "id", "isAnime", "maxQuality", "musicAuthor", "musicStyle", "similarThumbnailId", "subtitle", "subtitleSource", "thumbnail", "uuid", "videoEditor", "youtubeId" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");
CREATE UNIQUE INDEX "Video_uuid_key" ON "Video"("uuid");
CREATE UNIQUE INDEX "Video_youtubeId_key" ON "Video"("youtubeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_id_key" ON "Keywords"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_uuid_key" ON "Keywords"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_name_key" ON "Keywords"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordsToVideo_AB_unique" ON "_KeywordsToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordsToVideo_B_index" ON "_KeywordsToVideo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");
