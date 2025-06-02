import BenefitsIcons from "./BenefitsIcons";
import Brands from "./Brands";
import MainCarousel from "./MainCarousel"
import News from "./News";
import BusinessInfo from "./BusinessInfo/BusinessInfo";

function Home() {
  return (
    <>
      <MainCarousel/>
      <BenefitsIcons />
      <News />
      <Brands/>
      <BusinessInfo/>
    </>
  );
}

export default Home;