"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import sidebarItems from "@/utils/sidebaritems";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [messageErrors, setMessageErrors] = useState("");
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
        setMessageErrors(
          "Error al obtener datos del gremio. Por favor, intente nuevamente."
        );
        console.log(messageErrors);
      }
    }
    fetchGuildData();
  });

  return (
    <div className="bg-white w-48 min-h-screen p-2 fixed">
      <Link href="/">
        <Image
          src={logo}
          width={200}
          height={200}
          alt="Creado por Aroldo"
        ></Image>
      </Link>
      <aside className="sidebar">
        <div className="sidebar__top">
          <p className="sidebar__logo-name text-lg font-bold">{guildName}</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link className="sidebar__link" href={href}>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul>
          <button className="sidebar__link" onClick={() => signOut()}>
            Cerrar session
          </button>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
