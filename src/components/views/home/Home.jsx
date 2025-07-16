import dynamic from "next/dynamic";

import MainCarousel from "./MainCarousel/MainCarousel"
import News from "./News/News";
import Brands from "./Brands/Brands";

const Services = dynamic(() => import("./Services"));
const BenefitsIcons = dynamic(() => import("./BenefitsIcons"));
const BusinessInfo = dynamic(() => import("./BusinessInfo/BusinessInfo"));



async function Home({slidesData}) {
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