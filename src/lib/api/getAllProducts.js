import ProductService from "@/models/product/ProductService";
import connectDB from "@/libs/mongodb";

const productService = new ProductService();

export async function getAllProducts() {
  await connectDB();
  try {
    const products = await productService.fetchProducts();
    return products;
  } catch (error) {
    throw error;
  }
}
