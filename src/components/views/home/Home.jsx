import dynamic from "next/dynamic";

import MainCarousel from "./MainCarousel/MainCarousel"
import News from "./News/News";
import Brands from "./Brands/Brands";

const Services = dynamic(() => import("./Services")); // Podrías añadir { ssr: false }
const BenefitsIcons = dynamic(() => import("./BenefitsIcons")); // Podrías añadir { ssr: false }
const BusinessInfo = dynamic(() => import("./BusinessInfo/BusinessInfo")); // Podrías añadir { ssr: false }




import { getSlidesDataWithBlur } from "@/lib/api/getSlidesDataWithBlur";

async function Home() {
  const slidesData = await getSlidesDataWithBlur();

  return (
    <>
      <MainCarousel initialSlidesData={slidesData}/>
      <BenefitsIcons />
      <News/>
      <Services/>
      <Brands/>
      <BusinessInfo/>
    </>
  );
}

export default Home;