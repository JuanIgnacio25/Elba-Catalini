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
        <div>
          <Image
            src={"/assets/FrenteLocal.jpeg"}
            alt={`Frente Local`}
            width={300}
            height={300}
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
      <div className="flex-1 min-h-[300px] md:min-h-[auto]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7975.044051815019!2d-61.39376042423263!3d-32.8163013452258!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c9de5b72d76f3b%3A0xe43492c01786c6aa!2sLa%20casa%20del%20Accesorio!5e0!3m2!1ses-419!2sar!4v1748555560385!5m2!1ses-419!2sar"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Casa Central"
          className="rounded-lg shadow-md h-[300px] md:h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default BusinessDetails;
