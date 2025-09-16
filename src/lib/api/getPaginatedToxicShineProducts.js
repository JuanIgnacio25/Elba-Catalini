import ProductService from "@/models/product/ProductService";
import { connectDB } from "../mongodb";
import { cache } from "react";

const productService = new ProductService();

export const getPaginatedToxicShineProducts = cache(async (page ,categories , limit = 24) => {
  await connectDB();
  
  try {
    const skip = (page - 1) * limit;
    const {products , total} = await productService.getPaginatedToxicShineProducts(categories , skip , limit);
    
    return {products , total};
  } catch (error) {
    throw error;
  }
});