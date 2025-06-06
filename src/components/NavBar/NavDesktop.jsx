"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Dropdown from "@/components/common/Dropdown/Dropdown";
import NavSearch from "@/components/NavBar/NavSearch";
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
        {menuOpen ? <IoMdClose /> : <PiListBold />}
      </div>
      <ul
        className={`${
          isMobile ? "nav-desktop-menu-mobile" : "nav-desktop-menu"
        } ${isMobile && menuOpen ? "open" : ""}`}
      >
        <li>
          <Dropdown
            category={{ name: "Electricidad", slug: "Electricidad" }}
            options={[
              {
                slug: "cable-tpr",
                name: "Cable TPR",
                variantSubCategory: [
                  { name: "Coelpla", slug: "coelpla" },
                ],
              },
              {
                slug: "enchufes",
                name: "Enchufes",
                variantSubCategory: [
                  {
                    name: "Enchufes de Aluminio",
                    slug: "enchufes-de-aluminio",
                  },
                  {
                    name: "Enchufes de PVC",
                    slug: "enchufes-de-pvc",
                  },
                  {
                    name: "Enchufes  Vulcanizados",
                    slug: "enchufes-vulcanizados",
                  },
                ],
              },
              {
                slug: "caño-corrugado-abierto",
                name: "Caño Corrugado Abierto",
              },
              { slug: "cinta-aisladora", name: "Cinta Aisladora" },
              { slug: "cinta-helicoidal", name: "Cinta Helicoidal" },
              { slug: "fichas-plasticas", name: "Fichas Plasticas" },
              { slug: "fusibles", name: "Fusibles" },
              { slug: "grampas", name: "Grampas" },
              { slug: "interruptores", name: "Interruptores" },
              { slug: "precintos", name: "Precintos" },
              { slug: "spaghetti-pvc", name: "Spaghetti PVC" },           
              { slug: "terminales-pala", name: "Terminales Pala" },
              { slug: "tubo-termocontraible", name: "Tubo Termocontraible" },
            ]}
            baseUrl={"/products/store"}
            toggleMenu={toggleMenu}
          />
        </li>
        <li>
          <Dropdown
            category={{ name: "Accesorios", slug: "Accesorios" }}
            options={[
              { slug: "accesorios-para-motos", name: "Accesorios para Motos" },
              { slug: "accesorios-para-niños", name: "Accesorios para Niños" },
              { slug: "accesorios-para-trailer", name: "Accesorios para Trailer" },
              { slug: "antenas", name: "Antenas" },
              { slug: "anti-robo", name: "Anti Robo" },
              { slug: "asientos-y-respaldos", name: "Asientos y Respaldos" },
              { slug: "compresores", name: "Compresores" },
              { slug: "cubre-alfombras", name: "Cubre Alfombras" },
              { slug: "cubre-asientos", name: "Cubre Asientos" },
              { slug: "cubre-volantes", name: "Cubre Volantes" },
              { slug: "detailing", name: "Detailing" },
              { slug: "escobillas", name: "Escobillas" },
              { slug: "seguridad", name: "Seguridad" },
              { slug: "varios", name: "Varios" },
            ]}
            baseUrl={"/products/store"}
            toggleMenu={toggleMenu}
          />
        </li>
        <li>
          <Dropdown
            category={{ name: "Iluminacion", slug: "Iluminacion" }}
            options={[
              { slug: "cree-led", name: "Cree Led" },
              { slug: "Lamparas-halogenas", name: "Lamparas Halogenas" },
              { slug: "reflectores y barras", name: "Reflectores y Barras" },
            ]}
            baseUrl={"/products/store"}
            toggleMenu={toggleMenu}
          />
        </li>
        <li>
          <Dropdown
            category={{ name: "3M", slug: "3M" }}
            options={[
              { slug: "bandas-reflectivas", name: "Bandas Reflectivas" },
              { slug: "circulos-de-velocidad", name: "Circulos de Velocidad" },
            ]}
            baseUrl={"/products/store"}
            toggleMenu={toggleMenu}
          />
        </li>
        <li>
          <Link href="/products/baiml" onClick={toggleMenu}>
            BAIML
          </Link>
        </li>
        <li>
          <Link href={"/products/toxic-shine"} onClick={toggleMenu}>
            Toxic Shine
          </Link>
        </li>
      </ul>
      <div className="nav-desktop-search-container">
        <NavSearch />
      </div>
      <div className="nav-desktop-cart items-end justify-end py-2 h-full w-1/12">
        <NavCart />
      </div>
    </nav>
  );
}

export default NavDesktop;
