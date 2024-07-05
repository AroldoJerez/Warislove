-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "split" REAL NOT NULL,
    "Completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_event" ("Completed", "createdAt", "id", "split", "updatedAt") SELECT "Completed", "createdAt", "id", "split", "updatedAt" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
