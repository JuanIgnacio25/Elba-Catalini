import ProductService from "@/models/product/ProductService";
import { connectDB } from "../mongodb";
import { cache } from "react";

const productService = new ProductService();

export const getProductById = cache(async (id) => {
  await connectDB();
  try {
    const product = await productService.findProductById(id);
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    throw error;
  }
});