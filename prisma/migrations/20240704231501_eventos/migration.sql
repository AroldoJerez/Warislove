-- CreateTable
CREATE TABLE "event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_ParticipaEnEvento" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ParticipaEnEvento_A_fkey" FOREIGN KEY ("A") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ParticipaEnEvento_B_fkey" FOREIGN KEY ("B") REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ParticipaEnEvento_AB_unique" ON "_ParticipaEnEvento"("A", "B");

-- CreateIndex
CREATE INDEX "_ParticipaEnEvento_B_index" ON "_ParticipaEnEvento"("B");
