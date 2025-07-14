import getSaleImage from "@/lib/api/getSaleImage";
import SaleModal from "./SaleModal";
import { getImageDataWithBlur } from "@/lib/api/getImageDataWithBlur";

export const revalidate = 60;

async function Sale() {
  const image = await getSaleImage();

  const imageBlurData = await getImageDataWithBlur(image.secure_url);

  const props = {
    ...image,
    imageBlurData
  }
  return <SaleModal saleImage={props}/>;
}

export default Sale;
