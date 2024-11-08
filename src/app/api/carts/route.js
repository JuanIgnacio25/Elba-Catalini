import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { connectDB } from "@/libs/mongodb";
import CartService from "@/models/cart/CartService";

const cartService = new CartService();

export async function GET(req) {
  try {
    const token = await getToken({
      req,
      cookieName:
        process.env.NODE_ENV === "development"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token",
      secret: process.env.NEXTAUTH_SECRET,
    });

    await connectDB();

    const cart = await cartService.getCartById(token.user.cartId);
    if (!cart) throw new Error("El carrito no existe");

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}