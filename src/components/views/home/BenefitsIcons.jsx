import { FiPackage } from "react-icons/fi";
import { RiTimerLine, RiMedalLine } from "react-icons/ri";
import { BiUserPin } from "react-icons/bi";

const BenefitItem = ({ title, text, IconComponent , hiddenMobile}) => {
  return (
    <div className={`${hiddenMobile ? "hidden sm:flex" : ""} flex flex-col justify-start items-center gap-2`}>
      <IconComponent className="text-2xl lg:text-3xl text-red-600" />
      <h2 className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center">
        {title}
      </h2>
      <p className="hidden sm:flex text-center text-xs lg:text-sm text-gray-600">{text}</p>
    </div>
  );
};

function BenefitsIcons() {
  return (
    <div className="w-full flex justify-center items-center mt-10 md:mt-20 px-2 md:px-4">
      <div className="w-full flex justify-center max-w-6xl gap-8">
        <BenefitItem
          title="30 años de trayectoria"
          text="Tres décadas de confianza y calidad respaldan nuestro servicio."
          IconComponent={RiMedalLine}
        />

        <BenefitItem
          title="Envíos a todo el país"
          text="Llegamos a cada rincón del país con tus productos."
          IconComponent={FiPackage}
        />

        <BenefitItem
          title="Despacho Eficiente"
          text="Compromiso y rapidez en cada envío para tu tranquilidad."
          IconComponent={RiTimerLine}
        />

        <BenefitItem
          title="Atención personalizada"
          text="Te acompañamos en cada paso de tu compra."
          IconComponent={BiUserPin}
          hiddenMobile={true}
        />
      </div>
    </div>
  );
}

export default BenefitsIcons;
