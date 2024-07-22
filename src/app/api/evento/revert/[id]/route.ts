// /pages/api/event/revert/[id].ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: "ID de evento no proporcionado" },
      { status: 400 }
    );
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    // Verificar si el evento está completado
    if (!event.completed) {
      return NextResponse.json(
        { message: "El evento no está completado y no puede ser revertido" },
        { status: 201 }
      );
    }

    // Obtener los logs relacionados con el evento específico
    const logs = await prisma.log.findMany({
      where: { action: "update" + id },
      orderBy: { timestamp: "desc" },
    });

    // Revertir los cambios basados en los logs obtenidos
    await prisma.$transaction(
      logs.map((log) =>
        prisma.money.update({
          where: { userId: log.userId },
          data: {
            amount: {
              decrement: parseFloat(log.newValue) - parseFloat(log.oldValue),
            },
          },
        })
      )
    );

    // Borrar los logs anteriores
    await prisma.log.deleteMany({
      where: { action: `update${id}` },
    });
    // Actualizar el estado del evento para marcarlo como no completado y activo
    await prisma.event.update({
      where: { id: Number(id) },
      data: {
        completed: false,
      },
    });

    return NextResponse.json(
      { message: "Evento revertido exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al revertir el evento:", error);
    return NextResponse.json(
      { error: "Error al revertir el evento" },
      { status: 500 }
    );
  }
}
