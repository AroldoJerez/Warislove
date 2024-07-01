"use client";
import NavBar from "@/app/components/NavBar";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

export default function LoginAuth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [messageErrors, setMessageErrors] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setMessageErrors(res?.error || "Contacte con administrador");
    } else {
      router.push("/dashboard");
    }
  });

  return (
    <>
      <NavBar />
      <main className="flex justify-center items-center h-screen">
        <div className="flex flex-col w-max p-2 bg-white shadow-black shadow-md">
          <h1 className="text-lg p-2 text-center font-semibold">
            Inicia session
          </h1>
          <form onSubmit={onSubmit} className="flex flex-col" id="formsignup">
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
            {errors.password && (
              <span className="text-red-500 text-sm">
                {typeof errors.password?.message === "string"
                  ? errors.password.message
                  : "Unknown error"}
              </span>
            )}
            <input
              placeholder="********"
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
              INGRESAR
            </button>
          </form>

          <div className="mt-2 font-semibold text-center text-red-600">
            {messageErrors}
          </div>
        </div>
      </main>
    </>
  );
}
