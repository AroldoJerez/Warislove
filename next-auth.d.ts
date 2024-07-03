// next-auth.d.ts

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      role?: string; // Agregar la propiedad 'role'
    };
  }
}
