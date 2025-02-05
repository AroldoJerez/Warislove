// pages/api/eventos/index.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Verificar si hay algún evento activo
    const eventos = await prisma.event.findMany();

    if (!eventos) {
      return NextResponse.json({
        data: "",
        message: "No existen eventos",
        status: "200",
      });
    }
    return NextResponse.json(eventos, { status: 200 });
  } catch (error) {
    console.error("Error fetching event status:", error);
    return NextResponse.json(
      { error: "Failed to fetch event status" },
      { status: 500 }
    );
  }
}
