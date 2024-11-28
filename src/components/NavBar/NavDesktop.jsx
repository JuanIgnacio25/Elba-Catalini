"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Dropdown from "@/components/common/Dropdown/Dropdown";

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
      <ul className="nav-desktop-menu">
        <li>
          <Link href="/products/baiml">Linea Baiml</Link>
        </li>
        <li>
          <Dropdown category={{name:"Iluminacion",slug:"Iluminacion"}} options={[{slug:"cree-led",name:"Cree Led"} , {slug:"Lamparas-halogenas",name:"Lamparas Halogenas"}]} baseUrl={"/products/store"}/>
        </li>
        <li>
          <Dropdown category={{name:"Iluminacion",slug:"Iluminacion"}} options={[{slug:"cree-led",name:"Cree Led"} , {slug:"Lamparas-halogenas",name:"Lamparas Halogenas"}]} baseUrl={"/products/store"}/>
        </li>
        <li>
          <Dropdown category={{name:"Iluminacion",slug:"Iluminacion"}} options={[{slug:"cree-led",name:"Cree Led"} , {slug:"Lamparas-halogenas",name:"Lamparas Halogenas"}]} baseUrl={"/products/store"}/>
        </li>
      </ul>
    </nav>
  );
}

export default NavDesktop;
