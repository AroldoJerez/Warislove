import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Verificar si hay algún evento activo
    const activeEvent = await prisma.event.findFirst({
      where: { actived: true },
    });

    if (!activeEvent) {
      return NextResponse.json({ actived: false });
    }

    return NextResponse.json({ actived: true });
  } catch (error) {
    console.error("Error fetching event status:", error);
    return NextResponse.json(
      { error: "Failed to fetch event status" },
      { status: 500 }
    );
  }
}
