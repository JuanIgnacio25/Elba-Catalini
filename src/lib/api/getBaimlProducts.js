import ProductService from "@/models/product/ProductService";
import { connectDB } from "../mongodb";

const productService = new ProductService();

export async function getBaimlProducts() {
  await connectDB();
  try {
    const products = await productService.getProducts('Baiml');
    return products;
  } catch (error) {
    throw error;
  }
}
