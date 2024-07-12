// pages/administracion/editarEvento/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

export default function EditarEvento() {
  const [eventos, setEventos] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("/api/evento");
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      router.push(`/administracion/editarEvento/${selectedEvent.id}`);
    }
  };

  return (
    <div>
      <Sidebar />
      <main className="flex justify-center items-center h-screen">
        <div className="bg-white container w-auto p-5">
          <h1 className="text-2xl font-bold mb-4">Editar Eventos</h1>
          <p>Selecciona un evento:</p>
          <ul className="list-disc w-full">
            {eventos.map((event) => (
              <li
                key={event.id}
                onClick={() => handleSelectEvent(event)}
                className={`cursor-pointer mt-2 p-2 border-pink-800 flex items-center justify-center rounded ${
                  selectedEvent?.id === event.id
                    ? "border-2 bg-pink-400"
                    : "bg-pink-300"
                }`}
              >
                <p>{event.nameEvent}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={handleEditEvent}
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-yellow-500"
            disabled={!selectedEvent}
          >
            Editar Evento
          </button>
        </div>
      </main>
    </div>
  );
}
