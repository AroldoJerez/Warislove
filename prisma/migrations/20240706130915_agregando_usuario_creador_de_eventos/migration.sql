/*
  Warnings:

  - You are about to drop the column `Completed` on the `event` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_CreadorDeEvento" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CreadorDeEvento_A_fkey" FOREIGN KEY ("A") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CreadorDeEvento_B_fkey" FOREIGN KEY ("B") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "split" REAL NOT NULL DEFAULT 0,
    "siteDeposited" TEXT NOT NULL DEFAULT 'Debe ingresar un lugar',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "actived" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_event" ("createdAt", "id", "split", "updatedAt") SELECT "createdAt", "id", "split", "updatedAt" FROM "event";
DROP TABLE "event";
ALTER TABLE "new_event" RENAME TO "event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CreadorDeEvento_AB_unique" ON "_CreadorDeEvento"("A", "B");

-- CreateIndex
CREATE INDEX "_CreadorDeEvento_B_index" ON "_CreadorDeEvento"("B");
