import { NextResponse } from "next/server";

import { connectDB } from "@/libs/mongodb";
import ProductService from "@/models/product/ProductService";

const productService = new ProductService();

export async function GET(req, { params }) {
  try {
    const { productKind } = params;
    console.log(productKind);
    if (productKind !== "Baiml" && productKind !== "Store")
      throw new Error("El tipo de producto no existe");

    await connectDB();

    const products = await productService.getProducts(productKind);

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
