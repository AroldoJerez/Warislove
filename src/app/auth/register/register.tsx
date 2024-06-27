"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/navigation";

interface SignupProps {
  data: { Name: string; GuildName: string }[];
}

interface FormInputs {
  username: string;
  email: string;
  password: string;
}

export default function Signup({ data }: SignupProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const router = useRouter();

  const [isUserValid, setIsUserValid] = useState(false);

  const usernameTarget = watch("username");

  useEffect(() => {
    if (usernameTarget && Array.isArray(data)) {
      const userExists = data.some(
        (member) => member.Name.toLowerCase() === usernameTarget.toLowerCase()
      );
      setIsUserValid(userExists);
    } else {
      setIsUserValid(false);
    }
  }, [usernameTarget, data]);

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    if (isUserValid) {
      const response = await fetch("api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          guild: data[0].GuildName,
          password: formData.password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/auth/login");
      }
    } else {
      console.log("El usuario no se encuentra en warislove");
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
              placeholder="W A R I S L O V E"
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
            <button type="submit" className="pt-2 p-2 bg-blue-500 text-white">
              Registrar
            </button>
          </form>
          {usernameTarget && (
            <div
              className={`mt-2 text-center ${
                isUserValid ? "text-green-600" : "text-red-600"
              }`}
            >
              {isUserValid ? "Usuario válido" : "Usuario no encontrado"}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
