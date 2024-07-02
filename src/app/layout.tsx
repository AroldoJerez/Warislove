import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AnimatedBackground from "./components/AnimateBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bienvenidos a WARISLOVE",
  description: "Generado gracias a MELEVENGO",
};

export default async function RootLayout({
  children,
}: {
  isTrueSideBar: boolean;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AnimatedBackground></AnimatedBackground>
          {children}
        </Providers>
      </body>
    </html>
  );
}
