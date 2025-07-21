import Image from "next/image";
import Link from "next/link";

function ToxicShineOverlayContent() {
  return (
    <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center z-10 bg-black/70 pl-4 sm:p-6 md:p-8 text-center select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
        <div className="max-w-2xl flex flex-col items-center justify-center gap-4 sm:gap-6 mb-6">
          <Image
            src="/assets/brands/ToxicShineBrand.png"
            alt="Logo Toxic Shine"
            height={225}
            width={225}
            quality={70}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44  lg:h-48 lg:w-48 drop-shadow-lg object-contain"
            priority
          />
          <h1 className="text-white text-3xl sm:text-4xl md:text-4xl font-extrabold leading-tight drop-shadow-lg text-center sm:text-left">
            Cosmética Vehicular Premium
          </h1>
        </div>

        {/* Párrafo principal */}
        <p className="text-gray-100 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl px-2">
          Somos distribuidores mayoristas de Toxic Shine, te garantizamos{" "}
          <span className="font-semibold text-red-500">stock permanente</span> y
          <span className="font-semibold text-red-500">
            {" "}
            asesoramiento especializado{" "}
          </span>
          para todos los productos.
        </p>

        {/* Botón de acción */}
        <div className="mt-8 md:mt-10">
          <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105 text-sm sm:text-base">
            <Link href={"/products/toxic-shine"}>
              Explora la Línea Completa
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToxicShineOverlayContent;
