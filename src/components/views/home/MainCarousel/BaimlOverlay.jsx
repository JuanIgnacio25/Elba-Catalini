import Image from "next/image";
import Link from "next/link";

function BaimlOverlay() {
  return (
    <div
      className={`absolute inset-0 select-none bg-black/60 h-full w-full flex flex-col justify-center pl-4 sm:pl-0 gap-4 sm:gap-0 z-10 `}
    >
      <div className="flex flex-col pl-[12%] mb-4 lg:m-0">
        <div className="relative w-3/5 md:w-fit">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4 md:mb-0 inline-block">
            Distribuidores Oficiales BAIML
          </h1>
          <Image
            src="/logo-baiml-blanco.png"
            alt="logo-baiml"
            width={100}
            height={100}
            className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg absolute left-full top-1/2 -translate-y-1/2 ml-4"
            priority
          />
        </div>
        <div className="hidden xs:block w-[80%] md:w-[60%] lg:w-[40%]">
          <p className="text-gray-300 text-lg md:text-xl mb-4">
            Tecnología en iluminación. Faros Universales de calidad y durabilidad
            garantizada.
          </p>
        </div>
      </div>

      <div className="w-auto p-0 sm:pr-[12%] flex flex-col items-end justify-center sm:justify-end ">
        <div className="flex justify-center sm:block w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <h2 className="text-white text-xl xs:text-2xl font-bold mb-0 inline-block">
            Precios mayoristas imbatibles
          </h2>
        </div>
        <div className="flex justify-center m-auto sm:m-0 w-2/3 md:w-1/2 lg:w-1/3">
          <p className="text-center sm:text-start text-gray-300 text-md xs:text-lg md:text-xl mb-2 lg:mb-4">
            Iluminá tu negocio con la calidad Baiml al{" "}
            <span className="text-red-600">mejor precio</span>, asegurando
            rentabilidad y la satisfacción de tus clientes.
          </p>
        </div>
        <div className="w-full sm:w-2/3 flex justify-center sm:justify-end gap-2 ">
          <button className="px-5 py-2 text-sm xs:text-base text-white font-semibold rounded-full border-none bg-red-600 hover:bg-red-700 hover:text-white hover:scale-105 transition">
            <Link href={"/products/baiml"}>Ver Productos</Link>
          </button>
          <button className="px-5 py-2 bg-gray-100 text-sm xs:text-base text-red-800 font-semibold rounded-full shadow-md hover:bg-red-700 hover:text-white hover:scale-105 transition">
            <Link
              href={`https://web.whatsapp.com/send/?phone=5493471589042&text=${encodeURIComponent(
                "¡Hola! Me gustaría solicitar cotización de faros BAIML."
              )}`}
              target={"_blank"}
              rel="noreferrer noopener"
            >
              Obtené Cotizacion
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BaimlOverlay;
