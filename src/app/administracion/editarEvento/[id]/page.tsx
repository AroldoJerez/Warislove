// pages/administracion/editarEvento/[id].tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

export default function EditEventPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/evento/${id}`);
        const data = await response.json();
        setEventData(data);
        setValue("nameEvent", data.nameEvent);
        setValue("split", data.split);
        setValue("numberOfParticipants", data.numberOfParticipants);
        setValue("siteDeposited", data.siteDeposited);
        setValue("completed", data.completed);
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
      const result = await response.json();
      alert(result.message);
      router.push("/administracion/editarEvento");
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
    }
  };

  if (!eventData) {
    return (
      <main className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold mb-4 text-white">Loading...</h1>
      </main>
    );
  }

  return (
    <div>
      <Sidebar />
      <main className="flex justify-center items-center h-screen">
        <div className="bg-white container w-auto p-5">
          <h1 className="text-2xl font-bold mb-4">Editar Evento</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <label>
              Nombre del Evento:
              <input
                type="text"
                {...register("nameEvent", { required: true })}
                className="border p-2 rounded"
              />
            </label>
            <label>
              split:
              <input
                type="text"
                {...register("split", { required: true })}
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
              Sitio del loot depositado:
              <input
                type="string"
                {...register("siteDeposited", { required: true })}
                className="border p-2 rounded "
                placeholder="¿loot split 1 isla lymhurst?"
              />
            </label>
            <label>
              ¿Completado?
              <input
                type="checkbox"
                {...register("completed")}
                className="border p-2 rounded ml-5"
              />
            </label>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-green-500"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
