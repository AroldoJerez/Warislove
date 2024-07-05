"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Unauthorized({messagge}) {
  const [seconds, setSeconds] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      router.push("/");
    }
  }, [seconds, router]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center content-center bg-white rounded-sm w-max h-min-24 p-5">
        <h1 className="text-red-700 font-semibold">Ha ocurrido un inconveniente</h1>
        <p className="text-red-500">{messagge}</p>
        <div>
          {seconds > 0 ? (
            <div className="flex-col text-center">
              <h1>Te enviaremos al inicio en {seconds} seconds </h1>
              <button
                className="rounded-md border-solid border-2 p-2 mt-3 border-slate-400 bg-slate-200 hover:bg-red-400 hover:border-red-600 hover:text-white"
                onClick={() => router.push("/")}
              >
                click aqui para volver
              </button>
            </div>
          ) : (
            <h1>regresando...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
