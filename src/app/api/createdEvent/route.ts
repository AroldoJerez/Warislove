import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { nameEvent, numberOfParticipants, userId } = await request.json();

    // Verificar si los datos son válidos
    if (!nameEvent || !numberOfParticipants || !userId) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Crear un nuevo evento en la base de datos
    const newEvent = await prisma.event.create({
      data: {
        nameEvent,
        numberOfParticipants,
        userCreated: { connect: { id: parseInt(userId) } },
      },
    });

    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
