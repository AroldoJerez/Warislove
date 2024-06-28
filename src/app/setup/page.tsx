"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface FormInputs {
  nameGuild: string;
  idGuild: string;
}

export default function SetupGuild() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const response = await fetch("api/setup", {
      method: "POST",
      body: JSON.stringify({
        nameGuild: formData.nameGuild,
        idGuild: formData.idGuild,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {

      router.push("/");
    } /* else {
      const data = await response.json();
      setMessageErrors(data.error || "Error desconocido");
    }*/

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
          ></input>
          <label>Id del gremio</label>
          <input
            type="text"
            className="mb-2 p-2"
            {...register("idGuild", {
              required: { value: true, message: "Ingrese id de su gremio" },
            })}
          ></input>
          <button
            type="submit"
            className="pt-2 p-2 bg-green-500 text-white hover:bg-green-700"
          >
            Registrar gremio
          </button>
        </form>
      </div>
    </main>
  );
}
