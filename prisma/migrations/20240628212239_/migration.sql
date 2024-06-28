/*
  Warnings:

  - A unique constraint covering the columns `[nameGuild]` on the table `GuildData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idGuild]` on the table `GuildData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GuildData_nameGuild_key" ON "GuildData"("nameGuild");

-- CreateIndex
CREATE UNIQUE INDEX "GuildData_idGuild_key" ON "GuildData"("idGuild");
