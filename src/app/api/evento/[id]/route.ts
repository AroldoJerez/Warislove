// pages/api/eventos/index.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const idT = res; // ver de donde tomar el id
  try {
    // Verificar si hay algún evento activo
    const event = await prisma.event.findUnique({
      where: { id: Number({ id }) },
    });

    if (!event) {
      return NextResponse.json({
        data: "",
        message: "No existe event",
        status: "200",
      });
    }
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event status:", error);
    return NextResponse.json(
      { error: "Failed to fetch event status" },
      { status: 500 }
    );
  }
}
