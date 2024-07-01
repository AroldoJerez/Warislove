"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";

interface FormInputs {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const router = useRouter();
  const isUserValid = true;

  const [messageErrors, setMessageErrors] = useState("");
  const [guildName, setGuildName] = useState<string>(""); // Estado para almacenar el nombre del gremio

  useEffect(() => {
    async function fetchGuildData() {
      try {
        const response = await fetch("api/dataGuild"); // Endpoint para obtener los datos del gremio
        const data = await response.json();
        if (data.data) {
          setGuildName(data.data.nameGuild); // Asignar el nombre del gremio desde la respuesta del servidor
        }
      } catch (error) {
        console.error("Error al obtener datos del gremio:", error);
        setMessageErrors(
          "Error al obtener datos del gremio. Por favor, intente nuevamente."
        );
      }
    }
    fetchGuildData();
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const response = await fetch("api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          guild: guildName,
          password: formData.password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (data.data === "") {
        setMessageErrors(data.message || "Error desconocido");
      } else {
        router.push("/auth/login");
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
    <>
      <NavBar />
      <main className="flex justify-center items-center h-screen">
        <div className="flex flex-col w-max p-2 bg-white shadow-black shadow-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col"
            id="formsignup"
          >
            {errors.username && (
              <span className="text-red-500 text-sm">
                {typeof errors.username?.message === "string"
                  ? errors.username.message
                  : "Unknown error"}
              </span>
            )}
            <input
              placeholder="Usuario de Albion"
              type="text"
              {...register("username", {
                required: { value: true, message: "Ingrese su usuario" },
              })}
              className="mb-2 p-2"
            />
            <input
              placeholder={guildName}
              type="text"
              className={`mb-2 p-2 font-semibold text-center cursor-pointer ${
                isUserValid
                  ? "placeholder:text-green-600"
                  : "placeholder:text-red-600"
              }`}
              readOnly
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {typeof errors.email?.message === "string"
                  ? errors.email.message
                  : "Unknown error"}
              </span>
            )}
            <input
              placeholder="Correo"
              type="email"
              {...register("email", {
                required: { value: true, message: "El correo es requerido" },
              })}
              className="mb-2 p-2"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {typeof errors.password?.message === "string"
                  ? errors.password.message
                  : "Unknown error"}
              </span>
            )}
            <input
              placeholder="Contraseña"
              type="password"
              {...register("password", {
                required: { value: true, message: "Ingrese una contraseña" },
              })}
              className="mb-2 p-2"
            />
            <button
              type="submit"
              className={`pt-2 p-2 bg-blue-500 text-white  ${
                !messageErrors
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Registrar
            </button>
          </form>

          <div className="mt-2 text-center text-red-600">{messageErrors}</div>
        </div>
      </main>
    </>
  );
}
