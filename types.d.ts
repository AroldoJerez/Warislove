// next-auth.d.ts

import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      role?: string; // Agregar la propiedad 'role'
      id?: string;
    } & DefaultSession["user"];
  }
}

export const { auth, handlers } = NextAuth({
  callbacks: {
    session({ session, token, user }) {
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user: {
          ...session.user,
          role: user.role,
        },
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
});
