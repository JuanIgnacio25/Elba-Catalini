import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ProductService from "@/models/product/ProductService";

const productService = new ProductService();

export async function GET(req, { params }) {
  try {
    const { productKind, category } = params;

    await connectDB();

    const filteredProducts = await productService.findProductsByCategory(productKind, category);
    
    return NextResponse.json({filteredProducts} , {status: 200});
  } catch (error) {
    return NextResponse.json({message: error.message} , {status: 400});
  }
}
