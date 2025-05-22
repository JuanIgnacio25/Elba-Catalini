import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import ProductService from "@/models/product/ProductService";

const productService = new ProductService();

export async function DELETE(req, { params }) {
  try {
    const { id, public_id } = params;
    await connectDB();

    const product = await productService.findProductById(id);
    
    const sameImages = product.images.filter((image) => image.public_id === public_id);
    
    if(sameImages.length === product.images.length) throw new Error("Si borra la imagen el producto quedara sin imagenes, agrege una nueva imagen antes de borrar");

    const result = await productService.deleteProductImage(id, public_id, true);

    if (!result) throw new Error("No se encontro la imagen");

    return NextResponse.json({ message: "Imagen eliminada" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
