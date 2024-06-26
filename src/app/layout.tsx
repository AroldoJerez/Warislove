import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "./components/AnimateBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bienvenidos a WARISLOVE",
  description: "Generado gracias a MELEVENGO",
};

export default function RootLayout({
  children,
}: {
  isTrueSideBar: boolean;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedBackground></AnimatedBackground>
        {children}
      </body>
    </html>
  );
}
