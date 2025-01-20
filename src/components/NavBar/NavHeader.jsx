"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosMail } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";

function NavHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`nav-header-container ${
        isScrolled ? "nav-header-container-scrolled" : ""
      }`}
    >
      <div className={`nav-header-socialmedia ${isScrolled ? "scrolled" : ""}`}>
        <a
          href="https://www.instagram.com/la_casa_del_acceso_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiInstagramFill />
        </a>
        <a
          href="https://www.facebook.com/ElbaCatalini"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF />
        </a>
      </div>
      <div className={`nav-header-text-container ${isScrolled ? "scrolled" : ""}`}>
        <p>Todos los precios sujetos a presupuesto.</p>
      </div>
      <div className={`nav-header-items-container ${isScrolled ? "scrolled" : ""}`}>
        <Link href="/contact">
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
