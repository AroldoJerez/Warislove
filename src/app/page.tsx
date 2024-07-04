// pages/index.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import NavBar from "./components/NavBar";

export default function Home() {
  const [messageErrors, setMessageErrors] = useState("");
  const [guildName, setGuildName] = useState<string>(""); // Estado para almacenar el nombre del gremio

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
        setMessageErrors(
          "Error al obtener datos del gremio. Por favor, intente nuevamente."
        );
        console.log(messageErrors);
      }
    }
    fetchGuildData();
  });

  return (
    <>
      <NavBar />
      <section className="flex min-h-screen items-center justify-center text-6xl font-serif">
        <div className="text-white">{guildName}</div>
        <Image
          src={logo}
          width={500}
          height={500}
          alt="Picture of the author"
          priority={true}
        />
      </section>
    </>
  );
}
