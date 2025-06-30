import Link from "next/link";

import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";

function NavBarHeader() {
  return (
    <div className="w-full h-10 bg-red-600">
      <div className="container mx-auto h-full flex flex-row justify-end items-center text-white px-2 sm:px-0">
        <div className="flex flex-row items-center gap-1 sm:gap-2">
          <h3 className="font-semibold">Seguinos</h3>
          <Link
            href={"https://www.instagram.com/la_casa_del_acceso_/"}
            target="_blank"
          >
            <RiInstagramFill className="hover:text-neutral-900 transition" />
          </Link>
          <Link href={"https://www.facebook.com/ElbaCatalini"} target="_blank">
            <FaFacebookF className="hover:text-neutral-900 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBarHeader;
