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
        split: parseFloat(updatedData.split),
        numberOfParticipants: parseFloat(updatedData.numberOfParticipants),
        siteDeposited: updatedData.siteDeposited,
        completed: updatedData.completed,
        actived: updatedData.actived,
      },
      include: {
        participantes: true, // Incluir los participantes en la respuesta
      },
    });

    if (updatedEvent.completed) {
      const splitDivideFor = updatedEvent.participantes.length;
      const splitAmount = updatedEvent.split / splitDivideFor;

      const logs = [];

      await Promise.all(
        updatedEvent.participantes.map(async (participant) => {
          const originalMoney = await prisma.money.findUnique({
            where: { userId: participant.id },
          });

          if (originalMoney) {
            logs.push({
              action: "update" + id,
              userId: participant.id,
              oldValue: originalMoney.amount.toString(),
              newValue: (originalMoney.amount + splitAmount).toString(),
              timestamp: new Date(),
            });

            await prisma.money.update({
              where: { userId: participant.id },
              data: {
                amount: {
                  increment: splitAmount,
                },
              },
            });
          }
        })
      );

      await prisma.log.createMany({
        data: logs,
      });
    }

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
