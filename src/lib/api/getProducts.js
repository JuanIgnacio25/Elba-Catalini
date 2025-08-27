import ProductService from "@/models/product/ProductService";
import { connectDB } from "../mongodb";

const productService = new ProductService();

export async function getProducts(kind,category) {
  await connectDB();
  try {
    const products = await productService.getProducts(kind,category);
    return products;
  } catch (error) {
    throw error;
  }
}