"use client";
import sidebarItems from "@/utils/sidebaritems";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useSession, signOut } from "next-auth/react"; // Importar useSession y signOut desde next-auth/react
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { data: session } = useSession(); // Obtener la sesión del usuario
    const userRole = session?.user?.role;
  const router = useRouter();
  const handleSign = () => {
    if (session) {
      signOut(); // Cerrar sesión si hay una sesión activa
    } else {
      router.push("/auth/login"); // Aquí puedes manejar la lógica para iniciar sesión
    }
  };

  return (
    <nav className="bg-white w-full h-20 flex items-center justify-between fixed pr-10">
      <button className="btn p-2">
        <Image
          src={logo}
          width={60}
          height={60}
          alt="Creado por Aroldo"
          priority={true}
        />
      </button>
      <ul className="flex gap-4 h-20">
        {sidebarItems
          .filter((data) => {
            if (session) {
              return data.name !== "Registro";
            }
            return true;
          })
          .map(({ name, href }) => {
            return (
              <li className="sidebar__item justify-center" key={name}>
                <Link className="sidebar__link" href={href}>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        {userRole === "admin" && (
          <button
            className="bottom-4 sidebar__item p-2"
            onClick={() => router.push("/administracion")}
          >
            Administracion
          </button>
        )}
        <button className="bottom-4 sidebar__item p-2" onClick={handleSign}>
          {session ? "Cerrar sesión" : "Iniciar sesión"}
        </button>
      </ul>
    </nav>
  );
}
