//export { default } from "next-auth/middleware";

//export const config = { matcher: ["/dashboard"] };

// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  if (!token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Check if the user has the right role for /administrador
  if (pathname.startsWith("/administrador") && token.role !== "admin") {
    // Redirect to a "not authorized" page or home if the user is not an admin
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/administrador"],
};
