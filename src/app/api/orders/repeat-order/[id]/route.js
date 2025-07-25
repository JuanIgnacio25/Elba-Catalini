import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { connectDB } from "@/lib/mongodb";
import CartService from "@/models/cart/CartService";
import OrderService from "@/models/order/OrderService";
import ProductService from "@/models/product/ProductService";

const orderService = new OrderService();
const cartService = new CartService();
const productService = new ProductService();

export async function POST(req, { params }) {

  const { id: orderId } = params;

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

    const order = await orderService.findOrdersByUserIdAndOrderId(token.user.id,orderId);
    if(!order) throw new Error('No se encontro la orden');

    const productIds = order.products.map(product => product.productId);
    
    const allExists = await productService.checkProductsExist(productIds);

    if(!allExists) throw new Error("No se puede repetir el pedido , porque alguno de los productos no esta mas en nuestro catalogo")

    await cartService.clearCart(token.user.cartId);

    await cartService.addProductsArrayToCart(token.user.cartId,order.products);

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
