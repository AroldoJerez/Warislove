import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userName, eventId } = await request.json();

    // Verificar si el evento existe
    const evento = await prisma.event.findUnique({
      where: { id: Number(eventId) },
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

    // Agregar userId a la lista de participantes del evento
    const add = await prisma.event.update({
      where: { id: Number(eventId) },
      data: {
        participantes: {
          connect: { id: Number(userId) },
        },
      },
    });

    return NextResponse.json({ data: add, message: "Usuario Agregado" });
  } catch (error) {
    console.error("Error creating log:", error);
    return NextResponse.json(
      { error: "Failed to create log" },
      { status: 500 }
    );
  }
}
