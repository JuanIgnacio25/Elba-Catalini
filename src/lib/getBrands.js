import BrandsService from "@/models/brands/BrandsService";
import { connectDB } from "./mongodb";

const brandsService = new BrandsService();

async function getBrands(){
  try {
    await connectDB();
    const brands = await brandsService.getAllBrands();
    
    return brands;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default getBrands;