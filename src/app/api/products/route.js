import { NextResponse } from "next/server";

import { connectDB } from "@/libs/mongodb";
import ProductService from "@/models/product/ProductService";
import { isValidBaimlProduct } from "@/utils/validate/validateBaimlProducts";
import validateImage from "@/utils/validate/validateImage";
import uploadImagesToCloudinary from "@/utils/cloudinaryUploader";

const productService = new ProductService();

export async function POST(request) {
  try {
    const data = await request.formData();

    const images = data.getAll("images");

    const formFields = Object.fromEntries(
      [...data.entries()].filter(([key]) => key !== "images")
    );

    formFields.productSet = Number(formFields.productSet);

    isValidBaimlProduct(formFields);

    if (validateImage(images).length !== 0) {
      return NextResponse.json("No se subio imagen o exece los 3MB", {
        status: 400,
      });
    }

    const uploadResults = await uploadImagesToCloudinary(images);
    const uploadedImagesUrls = uploadResults.map((e) => e.secure_url);

    await connectDB();

    const product = {
      ...formFields,
      images: uploadedImagesUrls,
    };

    const newProduct = await productService.createProduct(product);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await productService.getAllProducts();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
