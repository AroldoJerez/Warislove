import DashboardTable from "@/app/components/DashboardTable";
import Sidebar from "@/app/components/Sidebar";
import { Metadata } from "next";

async function getData() {
  try {
    const res = await fetch(
      "https://gameinfo.albiononline.com/api/gameinfo/guilds/4ZOavdN2RyqcUGw-yG-v8w/members"
    );
    return res.json();
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}
export const metadata: Metadata = {
  title: "Informacion del gremio",
  description: "Generado gracias a MELEVENGO",
};

export default async function DataGuild() {
  const data = await getData();
  return (
    <main className="flex row-auto max-h-screen">
      <Sidebar />
      <DashboardTable data={data}></DashboardTable>
    </main>
  );
}
