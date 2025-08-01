import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import UserService from "@/models/user/UserService";

const userService = new UserService();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, request) {
        try {
          await connectDB();

          const userFound = await userService.getUserByEmail(credentials.email);

          if (!userFound) throw new Error("Email o contraseña inválidos");

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            userFound.password
          );
          if (!passwordMatch) throw new Error("Email o contraseña inválidos");

          return {
            email: userFound.email,
            cartId: userFound.cartId,
            rol: userFound.rol,
            companyName: userFound.companyName,
            cuit: userFound.cuit,
            phoneNumber: userFound.phoneNumber,
            purchasingManagerName: userFound.purchasingManagerName,
            location: userFound.location,
            address: userFound.address,
            carrier: userFound.carrier,
            id: userFound.userId,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user }) {
      if (user) token.user = user;
      if (trigger === "update") {
        try {
          await connectDB();

          const userFound = await userService.getUserByEmail(token.email);

          token.user.address = userFound.address;
          token.user.location = userFound.location;
          token.user.carrier = userFound.carrier;
        } catch (error) {
          console.log(error);
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token.user) {
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
