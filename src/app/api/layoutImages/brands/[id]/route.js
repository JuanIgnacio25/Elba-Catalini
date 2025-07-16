import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { connectDB } from "@/lib/mongodb";
import BrandsService from "@/models/brands/BrandsService";
import validateImage from "@/utils/validate/validateImage";
import { isValidBrand } from "@/utils/validate/validateBrand";

const brandsService = new BrandsService();

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await connectDB();

    const newBrandsOrder = await brandsService.deleteBrand(id);
    revalidatePath('/');

    return NextResponse.json(newBrandsOrder, { status: 200 });
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

    formFields.order = parseInt(formFields.order, 10);

    let brandToUpdate = formFields;

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
        brandToUpdate = { ...formFields, image };
      }
    }

    await connectDB();

    const newBrandsOrder = await brandsService.updateBrand(id, brandToUpdate);
    revalidatePath('/');

    return NextResponse.json(newBrandsOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
