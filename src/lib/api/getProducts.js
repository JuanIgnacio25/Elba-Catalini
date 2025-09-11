import ProductService from "@/models/product/ProductService";
import { connectDB } from "../mongodb";
import { cache } from "react";

const productService = new ProductService();

export const getProducts = cache(async (kind, category) => {
  await connectDB();
  try {
    const products = await productService.getProducts(kind, category);
    
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    throw error;
  }
});
