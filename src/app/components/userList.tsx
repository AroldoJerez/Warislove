"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  idAlbion: string;
  money: {
    amount: number;
  };
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedAmounts, setEditedAmounts] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      const initialAmounts = data.reduce(
        (acc: { [key: number]: number }, user: User) => {
          acc[user.id] = user.money.amount;
          return acc;
        },
        {}
      );
      setEditedAmounts(initialAmounts);
    };
    fetchUsers();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleAmountChange = (userId: number, amount: number) => {
    setEditedAmounts({
      ...editedAmounts,
      [userId]: amount,
    });
  };

  const handleSaveAmounts = async () => {
    try {
      // Hacer la solicitud al backend y esperar la respuesta
      await Promise.all(
        users.map(async (user) => {
          const oldAmount = user.money.amount;
          const newAmount = editedAmounts[user.id];

          // Actualizar el monto en la base de datos
          await fetch(`/api/users`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              amount: newAmount,
            }),
          });

          // Crear un log de la acción a través de la API
          await fetch("/api/logs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "update_amount",
              userId: user.id,
              oldValue: oldAmount.toString(),
              newValue: newAmount.toString(),
              timestamp: new Date().toISOString(),
            }),
          });
        })
      );

      // Si la solicitud se completa con éxito, actualizar el estado local
      setUsers(
        users.map((user) => ({
          ...user,
          money: { ...user.money, amount: editedAmounts[user.id] }, // Actualiza el monto de dinero con el monto editado
        }))
      );

      // Finalizar el modo de edición
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los montos:", error);
      // Manejar errores aquí (mostrar mensaje de error, etc.)
    }
  };

  return (
    <div>
      <ul id="listnav">
        {users.map((player) => (
          <li key={player.id}>
            <ul
              key={player.id + player.username}
              className="flex gap-2"
              id="listcenter"
            >
              <li className="text-lx min-w-20">
                <strong>Id:</strong>
                {player.id}
              </li>
              <li className="min-w-64">
                <strong>Id Guild:</strong>
                <p className="text-xs flex items-center">{player.idAlbion}</p>
              </li>
              <li className="w-52">
                <strong>Nombre:</strong>
                {player.username}
              </li>
              <li className="flex min-w-40">
                <strong>Saldo:</strong>
                {isEditing ? (
                  <input
                    type="number"
                    placeholder={String(editedAmounts[player.id])}
                    value={editedAmounts[player.id] ?? ""}
                    onChange={(e) =>
                      handleAmountChange(player.id, parseInt(e.target.value))
                    }
                    className="border border-gray-300 p-1 rounded"
                  />
                ) : (
                  <p>{player.money.amount.toLocaleString("es-ES")}</p>
                )}
              </li>
            </ul>
          </li>
        ))}
      </ul>
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
    </div>
  );
}
