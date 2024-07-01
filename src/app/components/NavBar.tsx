import sidebarItems from "@/utils/sidebaritems";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";

export default function NavBar() {
  return (
    <nav className="bg-white w-full flex items-center fixed">
      <button className="btn p-2">
        <Image
          src={logo}
          width={60}
          height={60}
          alt="Creado por Aroldo"
          priority={true}
        />
      </button>
      <ul className="flex">
        {sidebarItems.map(({ name, href }) => {
          return (
            <li className="sidebar__item" key={name}>
              <Link className="sidebar__link" href={href}>
                <span className="sidebar__name">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
