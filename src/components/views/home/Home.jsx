import BenefitsIcons from "./BenefitsIcons";
import Brands from "./Brands";
/* import MainCarousel from "./MainCarousel" */
import News from "./News";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <MainCarousel/> */}
      <BenefitsIcons />
      <News />
      <Brands/>
    </div>
  );
}

export default Home;