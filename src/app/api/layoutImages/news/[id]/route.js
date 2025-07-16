import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { connectDB } from "@/lib/mongodb";
import NewsService from "@/models/news/NewsService";
import { isValidNewsOrder } from "@/utils/validate/validateNewsOrder";

const newsService = new NewsService();

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await connectDB();

    const newNewsOrder = await newsService.deleteNews(id);
    revalidatePath('/');  
  
    return NextResponse.json(newNewsOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const order = await req.json();

    isValidNewsOrder(order);

    await connectDB();

    const newNewsOrder = await newsService.updateNews(id, order);
    revalidatePath('/'); 
    
    return NextResponse.json(newNewsOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
