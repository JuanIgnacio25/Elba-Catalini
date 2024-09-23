import { NextResponse } from "next/server";
import {getToken} from "next-auth/jwt"

import { connectDB } from "@/libs/mongodb";
import CartService from "@/models/cart/CartService";
import ProductService from "@/models/product/ProductService"
import validateQuantity from "@/utils/validate/validateQuantity";

const cartService = new CartService();
const productService = new ProductService();

export async function POST(req, { params }) {
  const { id } = params;
  const {quantity} = await req.json();
  
  const token = await getToken({
    req,
    cookieName: process.env.NODE_ENV === "development" ? "next-auth.session-token" : "__Secure-next-auth.session-token",
    secret: process.env.NEXTAUTH_SECRET,
  });

  try {
    validateQuantity(quantity);
    
    await connectDB();

    const product = await productService.findProductById(id);
    if(!product) throw new Error ("El producto no existe");
    const productData = { ...product.toObject(), quantity };
    await cartService.addProductToCart(token.user.cartId,productData);

    return NextResponse.json(`Producto agregado exitosamente`);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const {id} = params;
  const token = await getToken({
    req,
    cookieName: process.env.NODE_ENV === "development" ? "next-auth.session-token" : "__Secure-next-auth.session-token",
    secret: process.env.NEXTAUTH_SECRET,
  });

  try {
    await connectDB();

    const product = await productService.findProductById(id);
    if(!product) throw new Error ("El producto no existe");

    await cartService.removeProductFromCart(token.user.cartId , id);

    return NextResponse.json('Producto Eliminado del carrito correctamente');

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}