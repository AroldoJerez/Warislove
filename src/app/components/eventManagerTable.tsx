"use client";
export default function ManagerEventTable(usuario) {
  const handleEditToggle = () => {};

  const handleSaveAmounts = async () => {};
  console.log(usuario);
  return (
    <div>
      <ul id="listnav">{usuario && <p>{usuario["name"] + "hola"}</p>}</ul>
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
