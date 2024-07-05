import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Sidebar from "../components/Sidebar";
import ManagerEventTable from "../components/eventManagerTable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Evento() {
  const session = await getServerSession(authOptions);
  const listadeusuario = await prisma.event.findFirst({
    where: {
      actived: true,
    },
    include: {
      participantes: true, // Incluir los participantes del evento
    },
  });
  return (
    <>
      <Sidebar />
      <main className="flex justify-center items-center h-screen">
        <ManagerEventTable
          newusers={session ? session.user : null}
          userlist={listadeusuario}
        />
      </main>
    </>
  );
}
