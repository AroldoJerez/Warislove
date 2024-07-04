"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInputs {
  nameGuild: string;
  idGuild: string;
}

export default function SetupGuild() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>();

  const router = useRouter();
  const [guildDataExists, setGuildDataExists] = useState(false);
  const [messageErrors, setMessageErrors] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getGuildDate");
        const data = await response.json();
        if (data.data) {
          setGuildDataExists(true);
          setValue("nameGuild", data.data.nameGuild);
          setValue("idGuild", data.data.idGuild);
        } else {
          setValue("nameGuild", "");
          setValue("idGuild", "");
        }
      } catch (error) {
        setMessageErrors(
          "Error al obtener datos contacte con su administrador"
        );
      }
    }
    fetchData();
  }, [setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        body: JSON.stringify({
          nameGuild: formData.nameGuild,
          idGuild: formData.idGuild,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setMessageErrors("Error al actualizar el gremio. Intente de nuevo.");
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-max p-2 bg-white shadow-black shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
          id="formsignup"
        >
          <label>Nombre del gremio</label>
          <input
            type="text"
            className="mb-2 p-2"
            {...register("nameGuild", {
              required: { value: true, message: "Ingrese nombre de su gremio" },
            })}
          />
          {errors.nameGuild && (
            <span className="text-red-500 text-sm">
              {errors.nameGuild.message}
            </span>
          )}
          <label>Id del gremio</label>
          <input
            type="text"
            className="mb-2 p-2"
            {...register("idGuild", {
              required: { value: true, message: "Ingrese id de su gremio" },
            })}
          />
          {errors.idGuild && (
            <span className="text-red-500 text-sm">
              {errors.idGuild.message}
            </span>
          )}
          {messageErrors && (
            <span className="text-red-500 text-sm">{messageErrors}</span>
          )}
          <button
            type="submit"
            className={`pt-2 p-2 text-white  ${
              !guildDataExists
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {guildDataExists ? "Actualizar gremio" : "Registrar gremio"}
          </button>
        </form>
      </div>
    </main>
  );
}
