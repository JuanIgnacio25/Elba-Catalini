// components/BusinessDetails.jsx

import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineAccessTime } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

const BusinessDetails = () => {
  const infoStyles = "flex items-center gap-1 text-red-600";

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Información de Contacto */}
      <div className="w-full md:w-2/5 flex flex-col gap-2">
        <div className="relative w-2/3 md:w-3/4 aspect-[1/1]">
          <Image
            src={"/assets/frenteLocal.jpg"}
            alt="Frente Local"
            fill
            sizes="(max-width: 768px) 60vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className={infoStyles}>
          <FiPhone className="text-xl" />
          <strong>
            <Link href={"tel:+5493471422960"}>3471 422960</Link>
          </strong>
        </div>
        <div className={infoStyles}>
          <FaWhatsapp className="text-xl" />
          <strong>
            <Link href="https://wa.me/5493471589042" target={"_blank"}>
              3471 589042
            </Link>
          </strong>
        </div>
        <div className={infoStyles}>
          <MdOutlineEmail className="text-xl" />
          <strong>
            <Link href={"mailto:ventascatalini@gmail.com"}>
              ventascatalini@gmail.com
            </Link>
          </strong>
        </div>
        <div className="flex flex-row  gap-1">
          <div className="mt-1">
            <MdOutlineAccessTime className="text-xl text-red-600" />
          </div>
          <div className="">
            <p>
              <span className="font-bold">Lun a Vie:</span> 08:00 a 12 hs y
              15:00 a 19:00 hs
            </p>
            <p>
              <span className="font-bold">Sabados:</span> 08:00 a 12 hs
            </p>
          </div>
        </div>
        <div className={infoStyles}>
          <div className="mt-1 self-start">
            <IoLocationOutline className="text-xl" />
          </div>
          <div className="flex flex-col">
            <strong>
              <Link
                href={"https://maps.app.goo.gl/HyheHxLom2yTN3D8A"}
                target="_blank"
              >
                Bv.Centenario 639 <span className="!font-normal">(CP2500)</span>
              </Link>
            </strong>
            <p className="text-black font-normal">Cañada de Gómez, Santa Fe</p>
          </div>
        </div>
        <div className="w-full mx-2 mt-2">
          <Button
            variant="primaryRed"
            className="hover:shadow-xl hover:-translate-y-1 transition"
          >
            <Link
              href={"https://maps.app.goo.gl/HyheHxLom2yTN3D8A"}
              target="_blank"
            >
              Ir al Mapa
            </Link>
          </Button>
        </div>
      </div>

      {/*Google Maps */}
      <div className="w-full md:w-10/12">
        <a
          href="https://www.google.com/maps/place/?q=place_id:ChIJO2_XclveyZURqsaGF8CSNOQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={`https://maps.googleapis.com/maps/api/staticmap?center=-32.81514,-61.39023&zoom=15&size=680x340&markers=color:red%7Clabel:A%7C-32.81514,-61.39023&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            alt="Ubicación en Google Maps"
            width={680}
            height={340}
            className="rounded-lg shadow-md w-full h-auto"
          />
        </a>
      </div>
    </div>
  );
};

export default BusinessDetails;
