import { NextResponse } from "next/server";

import { connectDB } from "@/libs/mongodb";
import ProductService from "@/models/product/ProductService";
import CartService from "@/models/cart/CartService";

const productService = new ProductService();
const cartService = new CartService();

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectDB();
    const product = await productService.findProductById(Number(id));
    if(!product) throw new Error("El producto no existe");
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const deletedProduct = await productService.deleteProduct(Number(id));
    const cleanedCart = await cartService.removeProductFromAllCarts(id);
    
    return NextResponse.json(
      {
        message: `producto id:${deletedProduct.productId} - ${deletedProduct.name} eliminado y removido de ${cleanedCart} carritos`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PATCH(req, {params}) {
  const productToUpdate = await req.json();
  const {id} = params;

  try {
    await connectDB();
    const updateProduct = await productService.updateProduct(productToUpdate,Number(id));
    return NextResponse.json(updateProduct);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
