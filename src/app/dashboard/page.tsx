import { PrismaClient } from "@prisma/client";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const allUsers = await prisma.user.findMany();
  const allMoney = await prisma.money.findMany();

  return (
    <>
      <Sidebar />
      <main className="flex justify-center items-center h-screen">
        <Dashboard allUsers={allUsers} allMoney={allMoney} />
      </main>
    </>
  );
}
