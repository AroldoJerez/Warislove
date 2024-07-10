"use client";

import { useEffect, useState } from "react";

export default function ManagerEventTable({ newusers, userlist }) {
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (userlist && userlist.participantes) {
      setParticipants(userlist.participantes);
    }
  }, [userlist]);

  const handleEditToggle = () => {};

  const handleSaveAmounts = async () => {};

  const handleParticipates = async () => {
    const eventId = userlist.id;
    const userName = newusers.name;
    try {
      const response = await fetch("/api/evento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, eventId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al participar en el evento");
      }

      const data = await response.json();
      setMessage(data.message); // Actualiza el estado o muestra el mensaje de éxito
      setParticipants(data.participantes);
    } catch (error) {
      console.error("Error al participar en el evento:", error.message);
    }
  };

  if (!newusers) {
    return (
      <div className="bg-white rounded-lg p-10 font-semibold">
        <p>
          Debes <a href="/auth/login">iniciar session</a>
        </p>
      </div>
    );
  }
  if (!userlist) {
    return (
      <div className="bg-white rounded-lg p-10 font-semibold">
        <p>
          No existe evento creado...
          <a className="text-red-600 ml-5" href="/">
            VOLVER
          </a>
        </p>
      </div>
    );
  }
  const rol = newusers.role;
  return (
    <div className="flex-col bg-orange-400 p-5">
      <div className="flex justify-between mb-5">
        <h1 className="font-semibold ">PARTICIPANTES</h1>
        <button
          onClick={handleParticipates}
          className="min-w-24 h-10 px-3 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          Participar
        </button>
      </div>
      <ul className="bg-white">
        {participants && participants.length > 0 ? (
          participants.map((user) => (
            <ul key={user.id} className="flex w-full">
              <li className="w-40  border-slate-300 border-2">
                {user.username}
              </li>
              <li className="w-80 border-slate-300 border-2">
                {user.idAlbion}
              </li>
            </ul>
          ))
        ) : (
          <li>No hay participantes en este evento.</li>
        )}
      </ul>
      <div>
        <div className="p-4 flex items-center w-full content-center justify-center font-semibold">
          <label className="mr-4">Monto del split: </label>
          {rol === "admin" ? (
            <input type="text" className="w-40 text-center" />
          ) : (
            <p>{userlist.split.toLocaleString("es-ES")}</p>
          )}
        </div>
        {rol === "admin" && (
          <div>
            <button
              onClick={handleEditToggle}
              className="min-w-24 m-2 py-1 px-3 rounded right-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Editar
            </button>
            <button
              onClick={handleSaveAmounts}
              className="min-w-24 m-2 py-1 px-3 rounded bg-green-500 hover:bg-green-600 text-white"
            >
              Guardar
            </button>
          </div>
        )}
      </div>
      {message && (
        <p className="w-full text-center text-red-700 mt-10">{message}</p>
      )}
    </div>
  );
}
