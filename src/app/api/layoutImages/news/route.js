import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import NewsService from "@/models/news/NewsService";

import { uploadImageToCloudinary } from "@/utils/imageHandler/cloudinaryLayoutImagesHandler";
import { isValidBrand } from '@/utils/validate/validateBrand';
import validateImage from "@/utils/validate/validateImage";

const newsService = new NewsService();

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    const formFields = Object.fromEntries(
      [...data.entries()].filter(([key]) => key !== "image")
    );
    
    isValidBrand(formFields);

    if (validateImage([image]).length !== 0) {
      return NextResponse.json(
        { message: "No se subio imagen o exece los 3MB" },
        {
          status: 400,
        }
      );
    }

    const { secure_url, public_id } = await uploadImageToCloudinary(image, "news_preset");

    await connectDB();

    const news = {
      ...formFields,
      image: { url:secure_url, public_id },
    };

    const newNews = await newsService.createNews(news);

    return NextResponse.json(newNews, { status: 201 });
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
