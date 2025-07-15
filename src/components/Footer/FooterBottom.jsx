import Link from "next/link";

import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";

function FooterBottom() {
  return (
    <div className="flex flex-row justify-between items-center text-white ">
      <div className="flex flex-col gap-1">
        <p>©2025 Elba Catalini. Todos los derechos reservados</p>
        <p>
          Desarrollado por {" "}
          <span className="text-red-600 font-semibold hover:font-extrabold">
            <Link href="https://wa.me/5493471670274" target="_blank" className="inline-block hover:-translate-y-[2px] hover:translate-x-[2px] transition">
              Juan Ignacio Colli
            </Link>
          </span>
        </p>
      </div>
      <div className="hidden md:flex gap-2 text-3xl">
        <Link
          href={"https://www.instagram.com/la_casa_del_acceso_/"}
          target="_blank"
        >
          <RiInstagramFill className="hover:text-gray-500 hover:-translate-y-1 transition" />
        </Link>
        <Link href={"https://www.facebook.com/ElbaCatalini"} target="_blank">
          <FaFacebookF className="hover:text-gray-500 hover:-translate-y-1 transition" />
        </Link>
      </div>
    </div>
  );
}

export default FooterBottom;
