import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongodb';

import ProductService from '@/models/product/ProductService';

const productService = new ProductService();

export async function PATCH(req, {params}){
  const productToUpdate = await req.json();
  const {id} = params;

  try {
    await connectDB();
    const updateProduct = await productService.updateProduct(productToUpdate, Number(id));
    return NextResponse.json(updateProduct);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(req, {params}){
  try {
    const {id , public_id} = params;
    await connectDB();

    const result = await productService.deleteProductImage(id, public_id, true);

    if(!result) throw new Error("No se encontro la imagen");
    
    NextResponse.json({message: "Imagen eliminada"} , {status: 200});
  } catch (error) {
    NextResponse.json({message: error.message} , {status: 400});
  }
  

    
  try {
    return NextResponse.json("Llegue wachin");
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
