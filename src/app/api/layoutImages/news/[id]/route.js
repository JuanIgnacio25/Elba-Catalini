import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import NewsService from "@/models/news/NewsService";
import validateImage from "@/utils/validate/validateImage";
import { isValidBrand } from "@/utils/validate/validateBrand";

const newsService = new NewsService();

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await connectDB();
    const newNewsOrder = await newsService.deleteNews(id);
    return NextResponse.json(newNewsOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.formData();
    const image = data.get("image");

    const formFields = Object.fromEntries(
      [...data.entries()].filter(([key]) => key !== "image")
    );

    let newsToUpdate = formFields;

    isValidBrand(formFields);

    if (image) {
      if (validateImage([image]).length !== 0) {
        return NextResponse.json(
          { message: "No se subio imagen o exece los 3MB" },
          {
            status: 400,
          }
        );
      } else {
        newsToUpdate = { ...formFields, image };
      }
    }

    await connectDB();
    const newNewsOrder = await newsService.updateNews(id, newsToUpdate);
    return NextResponse.json(newNewsOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
