import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { action, userId, oldValue, newValue } = await request.json();

    // Crear un nuevo log en la base de datos
    const newLog = await prisma.log.create({
      data: {
        action,
        user: { connect: { id: parseInt(userId) } },
        oldValue,
        newValue,
      },
    });

    return NextResponse.json(newLog);
  } catch (error) {
    console.error("Error creating log:", error);
    return NextResponse.json(
      { error: "Failed to create log" },
      { status: 500 }
    );
  }
}
