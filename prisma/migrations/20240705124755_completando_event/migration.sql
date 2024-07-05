/*
  Warnings:

  - Added the required column `Completed` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `split` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "split" REAL NOT NULL,
    "Completed" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_event" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
