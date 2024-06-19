import { NextResponse } from "next/server";

import { connectDB } from "@/libs/mongodb";
import ProductService from '@/models/product/ProductService'

const productService = new ProductService();

export async function POST(request) {
  try {
    await connectDB();
    const product = await request.json()
    const newProduct = await productService.createProduct(product);
    return NextResponse.json(newProduct,{status: 201});
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: error.message} , {status: 400});
  }
}

export async function GET(){
  try {
    await connectDB();
    const products = await productService.getAllProducts();
    return NextResponse.json({products},{status: 200});
  } catch (error) {
    return NextResponse.json({message: error.message} , {status: 400});
  }
}