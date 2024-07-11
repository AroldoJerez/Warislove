// pages/administracion/editarEvento/[id].tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";

export default function EditEventPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/evento/${id}`);
        const data = await response.json();
        setEventData(data);
        setValue("nameEvent", data.nameEvent);
        setValue("numberOfParticipants", data.numberOfParticipants);
        setValue("actived", data.actived);
      } catch (error) {
        console.error("Error al obtener el evento:", error);
      }
    };

    fetchEvent();
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`/api/evento/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el evento");
      }

      router.push("/administracion/editarEvento");
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
    }
  };

  if (!eventData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Evento</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label>
          Nombre del Evento:
          <input
            type="text"
            {...register("nameEvent", { required: true })}
            className="border p-2 rounded"
          />
        </label>
        <label>
          Número de Participantes:
          <input
            type="number"
            {...register("numberOfParticipants", { required: true })}
            className="border p-2 rounded"
          />
        </label>
        <label>
          Activo:
          <input
            type="checkbox"
            {...register("actived")}
            className="border p-2 rounded"
          />
        </label>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
