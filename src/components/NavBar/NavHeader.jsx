import React from "react";
import Link from "next/link";
import { MdPlace } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { IoIosMail } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";

function NavHeader() {
  return (
    <div className="nav-header-container">
      <div className="nav-header-socialmedia">
        <RiInstagramFill/>
        <FaFacebookF/>
      </div>
      <div className="nav-header-text-container">
        <p>Los mejores precios mayoristas del pais!</p>
      </div>
      <div className="nav-header-items-container">
        <Link href="/">
          <div className="nav-header-items">
            <HiUserGroup />
            <span>Nosotros</span>
          </div>
        </Link>

        <Link href="/">
          <div className="nav-header-items">
            <MdPlace />
            <span>Local</span>
          </div>
        </Link>

        <Link href="/">
          <div className="nav-header-items">
            <IoIosMail />
            <span>Contacto</span>
          </div>
        </Link>
      </div>
      
    </div>
  );
}

export default NavHeader;
