// pages/administrador.tsx

import Sidebar from "../components/Sidebar";
import UserList from "../components/userList";

export default function Administrador() {
  return (
    <main className="flex row-auto max-h-screen">
      <Sidebar />
      <div className="ml-48 p-4 grow flex justify-center">
        <UserList />
      </div>
    </main>
  );
}
