import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { connectDB } from "@/libs/mongodb";
import OrderService from "@/models/order/OrderService";

const orderService = new OrderService();

export async function GET(req, { params }) {
  try {
    const { id: orderId } = params;
    const token = await getToken({
      req,
      cookieName:
        process.env.NODE_ENV === "development"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token",
      secret: process.env.NEXTAUTH_SECRET,
    });

    await connectDB();

    const order = await orderService.findOrdersByUserIdAndOrderId(
      token.user.id,
      orderId
    );

    if (!order) throw new Error("El numero de orden no coincide con su usuario");

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
