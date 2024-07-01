"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import sidebarItems from "@/utils/sidebaritems";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [guildName, setGuildName] = useState<string>(""); // Estado para almacenar el nombre del gremio

  useEffect(() => {
    async function fetchGuildData() {
      try {
        const response = await fetch("/api/dataGuild"); // Endpoint para obtener los datos del gremio
        const data = await response.json();
        if (data.data) {
          setGuildName(data.data.nameGuild); // Asignar el nombre del gremio desde la respuesta del servidor
        }
      } catch (error) {
        console.error("Error al obtener datos del gremio:", error);
      }
    }
    fetchGuildData();
  });

  return (
    <nav className="bg-white w-48 min-h-screen fixed text-slate-700">
      <Link href="/">
        <Image src={logo} width={200} height={200} alt="Logo" priority={true} />
      </Link>
      <aside className="sidebar">
        <div className="sidebar__top">
          <p className="sidebar__logo-name text-lg font-bold pl-2">
            {guildName}
          </p>
        </div>
        <ul className="sidebar__list border-solid">
          {sidebarItems.map(({ name, href }) => {
            return (
              <li className="sidebar__item w-48" key={name}>
                <Link className="sidebar__link" href={href}>
                  <p className="sidebar__name">{name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <button
        className="bg-red-500 absolute bottom-4 text-center font-semibold w-full h-10 cursor-pointer hover:bg-red-900 text-white"
        onClick={() => signOut()}
      >
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Sidebar;
