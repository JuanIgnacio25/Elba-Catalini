import ProductService from "@/models/product/ProductService";
import { connectDB } from "../mongodb";

const productService = new ProductService();

export async function getProductById(id) {
  await connectDB();

  try {
    const product = await productService.findProductById(id);
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    throw error;
  }
}