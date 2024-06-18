import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png"


const sidebarItems = [
  {
    name: "Home",
    href: "/",
    icon: ".",
  },
  {
    name: "About",
    href: "/about",
    icon: ".",
  },
  {
    name: "Mails",
    href: "/mails",
    icon: ".",
  },
  {
    name: "Contact",
    href: "/contact",
    icon: ".",
  },
];

const Sidebar = () => {

  return (
    <div className="bg-white w-48 min-h-screen p-2 fixed">
      <button className="btn" >
        <Image
      src={logo}
      width={200}
      height={200}
      alt="Creado por Aroldo"></Image>
      </button>
      <aside className="sidebar" >

        <div className="sidebar__top">
          <p className="sidebar__logo-name text-lg font-bold">W A R I S L O V E</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className="sidebar__link"
                  href={href}
                >
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;