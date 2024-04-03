-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "description" TEXT NOT NULL,
    "youtubeId" INTEGER NOT NULL,
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
INSERT INTO "new_Video" ("description", "editStyle", "id", "isAnime", "maxQuality", "musicAuthor", "musicStyle", "name", "similarThumbnailId", "subtitle", "subtitleSource", "thumbnail", "uuid", "videoEditor", "youtubeId") SELECT "description", "editStyle", "id", "isAnime", "maxQuality", "musicAuthor", "musicStyle", "name", "similarThumbnailId", "subtitle", "subtitleSource", "thumbnail", "uuid", "videoEditor", "youtubeId" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");
CREATE UNIQUE INDEX "Video_uuid_key" ON "Video"("uuid");
CREATE UNIQUE INDEX "Video_youtubeId_key" ON "Video"("youtubeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
