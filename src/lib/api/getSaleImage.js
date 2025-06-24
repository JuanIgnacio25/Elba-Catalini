import { connectDB } from "../mongodb";
import SaleService from "@/models/sale/SaleService";

const saleService = new SaleService();

export default async function getSaleImage() {
  try {
    await connectDB();
    const saleImage = await saleService.getSale();
  
    return saleImage;
  } catch (error) {
    console.log(error);
    return null;
  }
}
