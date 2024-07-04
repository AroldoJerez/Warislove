import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Sidebar from "../components/Sidebar";

export default async function Evento() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className="flex row-auto max-h-screen">
      <Sidebar />
      <pre>{JSON.stringify(session, null, 2)}</pre>;
      <tabletEventManager />
    </main>
  );
}
