import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import BrandsService from "@/models/brands/BrandsService";

const brandsService = new BrandsService();

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await connectDB();
    const deletedBrand = await brandsService.deleteBrand(id);
    return NextResponse.json(deletedBrand, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
