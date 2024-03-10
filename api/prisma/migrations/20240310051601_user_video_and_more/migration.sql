-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "videoUUID" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" INTEGER NOT NULL DEFAULT 0,
    "like" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Player_videoUUID_fkey" FOREIGN KEY ("videoUUID") REFERENCES "Video" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SimilarThumbnails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "videoId" INTEGER,
    CONSTRAINT "Tags_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Animes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "youtubeId" INTEGER NOT NULL,
    "maxQuality" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "subtitleSource" TEXT NOT NULL,
    "musicAuthor" TEXT NOT NULL,
    "musicStyle" TEXT NOT NULL,
    "videoEditor" TEXT NOT NULL,
    "editStyle" TEXT NOT NULL,
    "isAnime" BOOLEAN NOT NULL DEFAULT true,
    "similarThumbnailId" INTEGER,
    CONSTRAINT "Video_similarThumbnailId_fkey" FOREIGN KEY ("similarThumbnailId") REFERENCES "SimilarThumbnails" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_LanguageToVideo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LanguageToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Language" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LanguageToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AnimesToVideo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AnimesToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Animes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AnimesToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CharactersToVideo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CharactersToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Characters" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CharactersToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_uuid_key" ON "Player"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "Player"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SimilarThumbnails_id_key" ON "SimilarThumbnails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SimilarThumbnails_uuid_key" ON "SimilarThumbnails"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_id_key" ON "Tags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_uuid_key" ON "Tags"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Language_id_key" ON "Language"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Language_uuid_key" ON "Language"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Animes_id_key" ON "Animes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Animes_uuid_key" ON "Animes"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Characters_id_key" ON "Characters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Characters_uuid_key" ON "Characters"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Video_uuid_key" ON "Video"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Video_youtubeId_key" ON "Video"("youtubeId");

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToVideo_AB_unique" ON "_LanguageToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToVideo_B_index" ON "_LanguageToVideo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimesToVideo_AB_unique" ON "_AnimesToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimesToVideo_B_index" ON "_AnimesToVideo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharactersToVideo_AB_unique" ON "_CharactersToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_CharactersToVideo_B_index" ON "_CharactersToVideo"("B");
