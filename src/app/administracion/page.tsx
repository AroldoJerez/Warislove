// pages/administrador.tsx
import { PrismaClient } from "@prisma/client";
import Sidebar from "../components/Sidebar";

const prisma = new PrismaClient();

export default async function administracion() {
  const allUsers = await prisma.user.findMany();
  const allMoney = await prisma.money.findMany();
  return (
    <main className="flex row-auto max-h-screen">
      <Sidebar />
      <div className="ml-48 p-4 grow flex justify-center">
        <ul id="listnav">
          {allUsers.map((player) => {
            const userMoney = allMoney.find(
              (money) => money.userId === player.id
            );
            return (
              <li key={player.id}>
                <ul
                  key={player.id + player.username}
                  className="flex gap-2"
                  id="listcenter"
                >
                  <li className="text-lx min-w-20">
                    <strong>Id:</strong>
                    {player.id}
                    <br />
                  </li>
                  <li className="w-52">
                    <strong>Nombre:</strong>
                    {player.username}
                    <br />
                  </li>
                  <li>
                    <strong className="w-52">Saldo:</strong>
                    {userMoney.amount}
                    <br />
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
