import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryp from "bcryptjs";

import { connectDB } from "@/libs/mongodb";
import UserService from "@/models/user/UserService";

const userService = new UserService();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
      },
      async authorize(credentials, request) {
        await connectDB();
        const userFound = await userService.getUserByEmail(credentials.email);
        if (!userFound) throw new Error("Email o cotraseña invalidos");

        const passwordMatch = await bcryp.compare(
          credentials.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Email o contraseña invalidos");
        return {email:userFound.email,fullname:userFound.fullname,id:userFound._id,rol:userFound.rol};
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, profile, user, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      if(token.user){
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60, // Duración de la sesión en segundos (7 días)
    updateAge: 24 * 60 * 60, // Tiempo en segundos para actualizar la sesión (1 día)
  },
  /* cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        secure: false,
        maxAge: 7 * 24 * 60 * 60, // Duración de la cookie en segundos (7 días)
      },
    },
  }, */
});

export const GET = handler;
export const POST = handler;