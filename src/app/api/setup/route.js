import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();

    // Fetch existing GuildData
    const existingGuildData = await prisma.guildData.findFirst();

    if (existingGuildData) {
      // Update the existing entry
      const updatedGuildData = await prisma.guildData.update({
        where: { id: existingGuildData.id },
        data: {
          nameGuild: data.nameGuild,
          idGuild: data.idGuild,
        },
      });

      return NextResponse.json({
        data: updatedGuildData,
        message: "Actualización exitosa",
        status: 200,
      });
    } else {
      // Create a new entry if it doesn't exist
      const newGuildData = await prisma.guildData.create({
        data: {
          nameGuild: data.nameGuild,
          idGuild: data.idGuild,
        },
      });

      return NextResponse.json({
        data: newGuildData,
        message: "Registro exitoso",
        status: 201,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
