"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Dropdown from "@/components/common/Dropdown/Dropdown";
import NavCart from "@/components/NavBar/NavCart";

import { PiListBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

function NavDesktop() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth < 903);
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

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

  const toggleMenu = () => {
    if (isMobile) {
      setMenuOpen((prev) => !prev);
    }
  };

  return (
    <nav className={`nav-desktop ${isScrolled ? "nav-desktop-scrolled" : ""}`}>
      <div
        className="nav-desktop-menu-icon text-3xl cursor-pointer"
        onClick={toggleMenu}
      >
        {isMobile && (menuOpen ? <IoMdClose /> : <PiListBold />)}
      </div>
      <ul
        className={`${
          isMobile ? "nav-desktop-menu-mobile" : "nav-desktop-menu"
        } ${isMobile && menuOpen ? "open" : ""}`}
      >
        <li>
          <Link href="/products/baiml">Linea Baiml</Link>
        </li>
        <li>
          <Link href={"/products/toxic-shine"}>Toxic Shine</Link>
        </li>
        <li>
          <Dropdown
            category={{ name: "Iluminacion", slug: "Iluminacion" }}
            options={[
              { slug: "cree-led", name: "Cree Led" },
              { slug: "Lamparas-halogenas", name: "Lamparas Halogenas" },
            ]}
            baseUrl={"/products/store"}
          />
        </li>
      </ul>
      <div className="nav-desktop-cart items-end justify-end py-2 h-full w-1/12">
        <NavCart />
      </div>
    </nav>
  );
}

export default NavDesktop;
