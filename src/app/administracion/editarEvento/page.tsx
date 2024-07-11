// pages/administracion/editarEvento/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Eventos</h1>
      <ul className="list-disc pl-5">
        {eventos.map((event) => (
          <li
            key={event.id}
            onClick={() => handleSelectEvent(event)}
            className={`cursor-pointer p-2 ${
              selectedEvent?.id === event.id ? "bg-gray-200" : ""
            }`}
          >
            {event.nameEvent}
          </li>
        ))}
      </ul>
      <button
        onClick={handleEditEvent}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        disabled={!selectedEvent}
      >
        Editar Evento
      </button>
    </div>
  );
}
