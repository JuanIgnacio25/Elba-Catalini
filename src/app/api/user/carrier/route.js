import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { connectDB } from "@/libs/mongodb";
import UserService from "@/models/user/UserService";
import { isValidCarrier } from "@/utils/validate/validateCarrier";

const userService = new UserService();

export async function POST(req) {
  const {carrier} = await req.json();
  
  try {
    const token = await getToken({
      req,
      cookieName:
        process.env.NODE_ENV === "development"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token",
      secret: process.env.NEXTAUTH_SECRET,
    });

    try {
      isValidCarrier(carrier);
    } catch (error) {
      throw new Error("El nombre del transporte es requerido")
    }

    
    await connectDB();
     
    await userService.changeCarrierById(token.user.id, carrier);
    
    return NextResponse.json("ok", { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}