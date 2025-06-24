import getSaleImage from "@/lib/api/getSaleImage";
import SaleModal from "./SaleModal";

export const revalidate = 60;

async function Sale() {
  const image = await getSaleImage();

  return <SaleModal saleImage={image}/>;
}

export default Sale;
