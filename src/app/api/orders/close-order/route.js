import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { connectDB } from "@/libs/mongodb";
import CartService from "@/models/cart/CartService";
import OrderService from "@/models/order/OrderService";

const orderService = new OrderService();
const cartService = new CartService();

export async function POST(req) {
  const token = await getToken({
    req,
    cookieName:
      process.env.NODE_ENV === "development"
        ? "next-auth.session-token"
        : "__Secure-next-auth.session-token",
    secret: process.env.NEXTAUTH_SECRET,
  });

  try {
    await connectDB();
    const cart = await cartService.getCartById(token.user.cartId);

    if (cart.products.length == 0)
      throw new Error("No se puede completar la compra de un carrito vacio");

    const order = await orderService.closeOrder(cart.products, token.user);
    await cartService.clearCart(token.user.cartId);
    /* console.log(
      order.createdAt.toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        dateStyle: "medium",
        timeStyle: "medium",
      })
    ); */

    return NextResponse.json("Email Enviado");
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
