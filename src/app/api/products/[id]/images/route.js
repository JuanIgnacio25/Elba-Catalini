import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import ProductService from "@/models/product/ProductService";
import validateImage from "@/utils/validate/validateImage";

const productService = new ProductService();

export async function PATCH(req, { params }) {
  try {
    const data = await req.formData();
    const image = data.get("image");
    const { id } = params;

    if (validateImage([image]).length !== 0) {
      return NextResponse.json(
        { message: "No se subio imagen o exece los 3MB" },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    await productService.updateProductImage(id, image);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
