import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userName, eventId } = await request.json();

    // Verificar si el evento existe
    const evento = await prisma.event.findUnique({
      where: { id: Number(eventId) },
      include: { participantes: true },
    });

    if (!evento) {
      return NextResponse.json({ error: "Evento no encontrado" });
    }
    //obtener el id por medio del usuario que viene desde session
    const user = await prisma.user.findUnique({
      where: { username: userName },
    });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" });
    }
    const userId = user.id;

    const isParticipating = evento.participantes.some(
      (participante) => participante.id === userId
    );

    if (isParticipating) {
      return NextResponse.json({
        message: "El usuario ya está participando en el evento",
        participantes: evento.participantes,
      });
    }

    // Agregar userId a la lista de participantes del evento
    const add = await prisma.event.update({
      where: { id: Number(eventId) },
      data: {
        participantes: {
          connect: { id: Number(userId) },
        },
      },
    });

    // Obtener la lista actualizada de participantes
    const updatedEvent = await prisma.event.findUnique({
      where: { id: Number(eventId) },
      include: {
        participantes: true,
      },
    });

    return NextResponse.json({
      data: add,
      message: "Usuario agregado",
      participantes: updatedEvent.participantes,
    });
  } catch (error) {
    console.error("Error creating log:", error);
    return NextResponse.json(
      { error: "Failed to create log" },
      { status: 500 }
    );
  }
}
