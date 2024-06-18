import { Metadata } from "next";
import Sidebar from "../components/sidebar";
import Dashboard from "../components/dashboard";



async function getData() {
  const res = await fetch('https://gameinfo.albiononline.com/api/gameinfo/guilds/4ZOavdN2RyqcUGw-yG-v8w/members');
  try {
    return  res.json();
  } catch (error) {
    return { error: 'Failed to fetch data'} ;
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
      <Sidebar></Sidebar>
<Dashboard data={data}></Dashboard>
    </main>
    )
  }


