"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import sidebarItems from "@/utils/sidebaritems";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [guildName, setGuildName] = useState<string>(""); // Estado para almacenar el nombre del gremio
  const { data: session } = useSession(); // Obtener la sesión del usuario
  const router = useRouter();
  const userRole = session ? session?.user?.role : "No has iniciado session";
  useEffect(() => {
    async function fetchGuildData() {
      try {
        const response = await fetch("/api/getGuildDate"); // Endpoint para obtener los datos del gremio
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

  const handleSign = () => {
    if (session) {
      signOut(); // Cerrar sesión si hay una sesión activa
    } else {
      router.push("/auth/login"); // Aquí puedes manejar la lógica para iniciar sesión
    }
  };

  const handleAdmin = (linkClick) => {
    router.push(linkClick);
  };

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
          {sidebarItems
            .filter((data) => {
              if (session) {
                return data.name !== "Registro";
              }
              return true;
            })
            .map(({ name, href }) => {
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
      <div className="flex-col absolute bottom-4 w-full ">
        {userRole === "admin" && (
          <>
            <button
              className="bg-orange-500 text-center font-semibold w-full h-10 cursor-pointer hover:bg-orange-700 text-white mb-1"
              onClick={() => handleAdmin("/administracion/crearEvento")}
            >
              Crear Evento
            </button>
            <button
              className="bg-purple-500 text-center font-semibold w-full h-10 cursor-pointer hover:bg-purple-700 text-white mb-1"
              onClick={() => handleAdmin("/administracion/editarEvento")}
            >
              Editar Evento
            </button>
            <button
              className="bg-blue-500 text-center font-semibold w-full h-10 cursor-pointer hover:bg-blue-700 text-white mb-1"
              onClick={() => handleAdmin("/administracion/dashboardAlbion")}
            >
              Listado Gremial
            </button>

            <button
              className="bg-green-500 text-center font-semibold w-full h-10 cursor-pointer hover:bg-green-700 text-white mb-1"
              onClick={() => handleAdmin("/administracion")}
            >
              Administacion
            </button>
          </>
        )}
        <button
          className="bg-red-500 text-center font-semibold w-full h-10 cursor-pointer hover:bg-red-700 text-white"
          onClick={() => handleSign()}
        >
          {session ? "Cerrar sesión" : "Iniciar sesión"}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
