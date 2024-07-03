import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Usuario",
          type: "text",
          placeholder: "Ingrese usuario",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userFound = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!userFound) throw new Error("Usuario o contraseña incorrecto");

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Usuario o contraseña incorrecto");

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
          role: userFound.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
