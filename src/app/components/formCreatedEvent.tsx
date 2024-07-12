"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react"; // Importar useSession y signOut desde next-auth/react
import { useRouter } from "next/navigation";

interface FormInputs {
  NameEvent: string;
  numberOfParticipants: number;
  siteDeposited: string;
}

export default function FormCreatedEvent() {
  const { data: session } = useSession(); // Obtener la sesión del usuario
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [messageErrors, setMessageErrors] = useState("");

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const response = await fetch("/api/createdEvent", {
        method: "POST",
        body: JSON.stringify({
          nameEvent: formData.NameEvent,
          numberOfParticipants: formData.numberOfParticipants,
          siteDeposited: formData.siteDeposited,
          userId: session.user.id,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (data.data === "") {
        setMessageErrors(data.message || "Error desconocido");
      } else {
        router.push("/evento");
        router.refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessageErrors(error.message || "Error desconocido");
      } else {
        setMessageErrors("Error desconocido");
      }
    }
  };
  return (
    <div className="bg-white shadow-lg flex flex-col justify-center items-center text-center">
      <div className="bg-red-500 w-full p-2">
        <h1 className="text-center text-xl">Creador de eventos</h1>
      </div>
      <form
        className="flex flex-col gap-2 pt-6 pb-4 px-5"
        id="formEvent"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Nombre del evento</label>
        {errors.NameEvent && (
          <span className="text-red-500">{errors.NameEvent.message}</span>
        )}
        <input
          type="text"
          className="placeholder:text-center text-center"
          placeholder="CTA LYMHURST"
          {...register("NameEvent", {
            required: {
              value: true,
              message: "Ingrese su nombre de la actividad",
            },
          })}
        />
        <label>Numero de participantes</label>
        {errors.numberOfParticipants && (
          <span className="text-red-500">
            {errors.numberOfParticipants.message}
          </span>
        )}
        <input
          type="number"
          className="placeholder:text-center text-center"
          placeholder="999999"
          {...register("numberOfParticipants", {
            required: { value: true, message: "Ingrese su usuario" },
          })}
        />
        <label>Lugar del split</label>
        {errors.siteDeposited && (
          <span className="text-red-500">{errors.siteDeposited.message}</span>
        )}
        <input
          type="string"
          className="placeholder:text-center text-center"
          placeholder="Ejemplo: loot split 1 lymhurst"
          {...register("siteDeposited", {
            required: { value: true, message: "Ingrese el lugar" },
          })}
        />
        <button
          type="submit"
          className="bg-green-500 text-center font-semibold w-full h-10 cursor-pointer hover:bg-green-700 text-white"
        >
          Crear Evento
        </button>
      </form>
      <p className="text-red-500 mb-2">{messageErrors}</p>
    </div>
  );
}
