import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Manejar GET para obtener un evento por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const idUrl = params.id;

  if (!idUrl) {
    return NextResponse.json(
      { error: "ID de evento no proporcionado" },
      { status: 400 }
    );
  }

  try {
    // Verificar si hay algún evento con el ID proporcionado
    const event = await prisma.event.findUnique({
      where: { id: Number(idUrl) },
    });

    if (!event) {
      return NextResponse.json({
        data: "",
        message: "No existe evento",
        status: 200,
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

// Manejar PUT para actualizar un evento por ID
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
    const data = await req.json();

    const updatedData = {
      ...data,
      actived: !data.completed, // Si completed es true, actived será false y viceversa
    };
    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        nameEvent: updatedData.nameEvent,
        split: parseFloat(updatedData.split), // Asegúrate de convertir el valor a float
        numberOfParticipants: parseFloat(updatedData.numberOfParticipants), // Asegúrate de convertir el valor a float
        siteDeposited: updatedData.siteDeposited,
        completed: updatedData.completed,
        actived: updatedData.actived, // asegúrate de que este campo existe y es válido en tu modelo
      },
    });

    return NextResponse.json(
      { message: "Evento actualizado exitosamente", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}
