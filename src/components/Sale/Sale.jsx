import getSaleImage from "@/lib/api/getSaleImage";
import SaleModal from "./SaleModal";
import { getImageDataWithBlur } from "@/lib/api/getImageDataWithBlur";

export const revalidate = 60;

async function Sale() {
  const image = await getSaleImage();

  
  if (!image) {
    return null;
  }

  const finalUrl = image.image.secure_url;

  if (!finalUrl) {
    return null;
  }

  const imageBlurData = await getImageDataWithBlur(finalUrl);

  return <SaleModal saleImage={{ ...image, imageBlurData }} />;
}

export default Sale;