import Image from "next/image";
import logo from "../../public/logo.png"

export default async function Home() {

  return (
<section className="flex min-h-screen items-center justify-center text-6xl font-serif">
<a className="text-white">WARISLOVE</a>
<Image
      src={logo}
      width={500}
      height={500}
      alt="Picture of the author"></Image>
  </section>
  );
}
