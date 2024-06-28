/*
  Warnings:

  - Added the required column `updatedAt` to the `GuildData` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuildData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nameGuild" TEXT NOT NULL,
    "idGuild" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_GuildData" ("id", "idGuild", "nameGuild") SELECT "id", "idGuild", "nameGuild" FROM "GuildData";
DROP TABLE "GuildData";
ALTER TABLE "new_GuildData" RENAME TO "GuildData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
