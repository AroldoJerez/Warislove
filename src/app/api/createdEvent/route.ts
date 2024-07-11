import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { nameEvent, numberOfParticipants, userId } = await request.json();

    const eventActived = await prisma.event.findFirst({
      where: { actived: true },
    });
    if (eventActived) {
      return NextResponse.json({
        data: "",
        error: "Ya existe un evento activo",
        status: 400,
      });
    }
    // Verificar si los datos son válidos
    if (!nameEvent || !numberOfParticipants || !userId) {
      return NextResponse.json({
        error: "Todos los campos son obligatorios",
        data: "",
        status: 400,
      });
    }

    // Crear un nuevo evento en la base de datos
    const newEvent = await prisma.event.create({
      data: {
        nameEvent,
        numberOfParticipants: Number(numberOfParticipants),
        userCreated: { connect: { id: parseInt(userId) } },
      },
    });

    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({
      data: "",
      error: "Failed to create event",
      status: 500,
      message: "Error, contacte a un administrador",
    });
  } finally {
    await prisma.$disconnect();
  }
}
