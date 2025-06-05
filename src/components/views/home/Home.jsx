import MainCarousel from "./MainCarousel"
import BenefitsIcons from "./BenefitsIcons";
import News from "./News";
import Services from "./Services";
import Brands from "./Brands";
import BusinessInfo from "./BusinessInfo/BusinessInfo";

function Home() {
  return (
    <>
      <MainCarousel/>
      <BenefitsIcons />
      <News />
      <Services/>
      <Brands/>
      <BusinessInfo/>
    </>
  );
}

export default Home;