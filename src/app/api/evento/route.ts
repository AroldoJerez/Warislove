// /pages/api/evento.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.body;

    try {
      // Ejemplo de cómo podrías agregar el usuario a la lista de participantes
      const evento = await prisma.evento.findUnique({
        where: { id: eventoId },
      });

      if (!evento) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }

      // Agregar userId a la lista de participantes del evento
      await prisma.evento.update({
        where: { id: eventoId },
        data: {
          participantes: {
            connect: { id: userId },
          },
        },
      });

      return res.status(200).json({ message: "Usuario agregado al evento" });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  // Manejar otros métodos de solicitud si es necesario
  return res.status(405).json({ error: "Método no permitido" });
}
