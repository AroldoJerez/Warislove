import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Sidebar from "../components/Sidebar";
import ManagerEventTable from "../components/eventManagerTable";

export default async function Evento() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Sidebar />
      <main className="flex justify-center items-center h-screen">
        <ManagerEventTable usuario={session.user} />
      </main>
    </>
  );
}
