import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SaleService from "@/models/sale/SaleService";

const saleService = new SaleService();

export async function GET() {
  try {
    await connectDB();
    const sale = await saleService.getSale();
    return NextResponse.json(sale, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}