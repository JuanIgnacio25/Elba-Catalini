import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { connectDB } from "@/lib/mongodb";
import SaleService from "@/models/sale/SaleService";
import validateImage from "@/utils/validate/validateImage";
import { uploadImageToCloudinary } from "@/utils/imageHandler/cloudinaryLayoutImagesHandler";

const saleService = new SaleService();

export async function PUT(req) {
  try {
    const data = await req.formData();
    const image = data.get("image");

    if (validateImage([image]).length !== 0) {
      return NextResponse.json(
        { message: "No se subio imagen o exece los 3MB" },
        {
          status: 400,
        }
      );
    }

    const { secure_url, public_id } = await uploadImageToCloudinary(image, "sale_preset");
    const saleImageToUpdate = {image: {secure_url , public_id}};
    
    await connectDB();

    const uploadedSaleImage = await saleService.updateSale(saleImageToUpdate);
    revalidatePath('/');

    return NextResponse.json(uploadedSaleImage, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}