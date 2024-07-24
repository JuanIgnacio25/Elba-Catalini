import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { connectDB } from "@/libs/mongodb";
import OrderService from "@/models/order/OrderService";

const orderService = new OrderService();

export async function GET(req) {
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

    const orders = await orderService.findOrdersByUserId(token.user.id);
    
    return NextResponse.json({orders},{status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}