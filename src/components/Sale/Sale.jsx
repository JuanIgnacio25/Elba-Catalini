import getSaleImage from "@/lib/api/getSaleImage";
import SaleModal from "./SaleModal";
import { getImageDataWithBlur } from "@/lib/api/getImageDataWithBlur";

export const revalidate = 60;

async function Sale() {
  const image = await getSaleImage();

  if (!image || !image.secure_url) {
    return null; 
  }

  // Si la URL es la misma, esto responde en 1 milisegundo gracias al caché.
  // Si subes una foto nueva (nueva URL), se procesa una sola vez y se guarda.
  const imageBlurData = await getImageDataWithBlur(image.secure_url);

  const props = {
    ...image,
    imageBlurData
  }
  
  return <SaleModal saleImage={props}/>;
}

export default Sale;
