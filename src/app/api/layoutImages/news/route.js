import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { connectDB } from "@/lib/mongodb";
import NewsService from "@/models/news/NewsService";
import ProductService from "@/models/product/ProductService";

const newsService = new NewsService();
const productsService = new ProductService();

export async function POST(req) {
  try {
    const {productId , order} = await req.json();

    
    await connectDB();

    const product = await productsService.findProductById(productId);
    if(!product) throw new Error(`No existe un producto con el id ${productId}`);
    
    const news = {
      order: order,
      productId: product.productId
    }

    
    const newNewsOrder = await newsService.createNews(news);
    revalidatePath('/');

    return NextResponse.json(newNewsOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const news = await newsService.getAllNews();
    return NextResponse.json({ news }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
