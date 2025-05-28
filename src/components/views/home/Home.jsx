import BenefitsIcons from "./BenefitsIcons";
/* import MainCarousel from "./MainCarousel" */
import News from "./News";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <MainCarousel/> */}
      <BenefitsIcons />
      <News />
    </div>
  );
}

export default Home;