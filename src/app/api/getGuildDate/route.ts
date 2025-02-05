// pages/api/guildData.ts aca vemos si hay datos en el setup
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const existingGuildData = await prisma.guildData.findFirst();

    if (existingGuildData) {
      return NextResponse.json({
        data: existingGuildData,
        message: "Datos encontrados",
        status: 200,
      });
    } else {
      return NextResponse.json({
        data: null,
        message: "No hay datos",
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
