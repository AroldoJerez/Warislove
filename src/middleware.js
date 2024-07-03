//export { default } from "next-auth/middleware";

//export const config = { matcher: ["/dashboard"] };
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  console.log("Middleware ejecutado");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("Token:", token);

  if (!token || token.role !== "admin") {
    console.log("No autorizado");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  console.log("Autorizado");
  return NextResponse.next();
}

export const config = {
  matcher: ["/administrador"],
};
