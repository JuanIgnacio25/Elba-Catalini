"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Dropdown from "@/components/common/Dropdown/Dropdown";
import NavCart from "@/components/NavBar/NavCart";

import { PiListBold } from "react-icons/pi";

function NavDesktop() {
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
    <nav className={`nav-desktop ${isScrolled ? "nav-desktop-scrolled" : ""}`}>
      <PiListBold className="nav-desktop-menu-icon  text-2xl" />
      <ul className="nav-desktop-menu">
        <li>
          <Link href="/products/baiml">Linea Baiml</Link>
        </li>
        <li>
          <Link href={"/products/toxic-shine"}>Toxic Shine</Link>
        </li>
        <li>
          <Dropdown category={{name:"Iluminacion",slug:"Iluminacion"}} options={[{slug:"cree-led",name:"Cree Led"} , {slug:"Lamparas-halogenas",name:"Lamparas Halogenas"}]} baseUrl={"/products/store"}/>
        </li>
      </ul>
      <div className="nav-desktop-cart items-end justify-end py-2 h-full w-1/12">
        <NavCart/>
      </div>
    </nav>
  );
}

export default NavDesktop;
