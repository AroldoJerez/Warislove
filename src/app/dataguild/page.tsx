import { Metadata } from "next";
import Sidebar from "../components/sidebar";


async function getData() {
    const res = await fetch('https://gameinfo.albiononline.com/api/gameinfo/guilds/4ZOavdN2RyqcUGw-yG-v8w/members')

   
    if (!res.ok) {

      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
  export const metadata: Metadata = {
    title: "Informacion del gremio",
    description: "Generado gracias a MELEVENGO",
  };
  export default async function DataGuild() {
    const data = await getData()
    return (
    <main className="flex flex-row">
      <Sidebar></Sidebar>
        <ul className="listnav">
{data.map((player:any) => (
 <li key={player.Id}>
 <span className="text-lx"><strong>ID</strong> {player.Id}<br /></span>
 <span><strong>Name:</strong> {player.Name}<br /></span>
</li>
))
}
</ul>
    </main>
    )
  }


