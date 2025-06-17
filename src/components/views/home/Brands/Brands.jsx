import getBrands from "@/lib/getBrands";
import BrandsCarousel from "./BrandsCarousel";

export const revalidate = 60;

async function Brands() {
  const brands = await getBrands();
  
  return <BrandsCarousel brands={brands}/>;
}

export default Brands;
