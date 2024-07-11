import Dashboard from "@/app/components/Dashboard";
import Sidebar from "@/app/components/Sidebar";
import { PrismaClient } from "@prisma/client";

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
