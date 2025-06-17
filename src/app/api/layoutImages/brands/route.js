import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import BrandsService from "@/models/brands/BrandsService";

import { uploadImageToCloudinary } from "@/utils/imageHandler/cloudinaryLayoutImagesHandler";
import { isValidBrand } from '@/utils/validate/validateBrand';
import validateImage from "@/utils/validate/validateImage";

const brandsService = new BrandsService();

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

    const { secure_url, public_id } = await uploadImageToCloudinary(image, "brands_preset");

    await connectDB();

    const brand = {
      ...formFields,
      image: { url:secure_url, public_id },
    };

    const newBrand = await brandsService.createBrand(brand);

    return NextResponse.json(newBrand, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const brands = await brandsService.getAllBrands();
    return NextResponse.json({ brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
