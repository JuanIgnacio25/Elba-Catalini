import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { connectDB } from "@/libs/mongodb";
import UserService from "@/models/user/UserService";
import { isValidShippingInfo } from "@/utils/validate/validateShippingInfo";

const userService = new UserService();

export async function POST(req) {
  const shippingInfo = await req.json();
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
      isValidShippingInfo(shippingInfo);
    } catch (error) {
      throw new Error("La dirección y la ubicación son obligatorias")
    }

    
    await connectDB();
    
    await userService.changeShippingInfoById(token.user.id, shippingInfo);
    
    return NextResponse.json("ok", { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
