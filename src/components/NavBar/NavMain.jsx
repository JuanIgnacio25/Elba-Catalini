"use client";

import { useState, useEffect, Suspense } from "react";

import Link from "next/link";
import Image from "next/image";

import DropdownSelectFallback from "@/components/Fallbacks/DropdownSelectFallback";
import DropdownSelect from "@/components/NavBar/DropdownSelect";
import NavCart from "@/components/NavBar/NavCart";
import NavSearch from "@/components/NavBar/NavSearch";

function NavMain() {
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
    <nav className={`nav-main ${isScrolled ? "nav-main-scrolled" : ""}`}>
      <ul className={`nav-main-responsive-image-container`}>
        <li
          className={`nav-main-responsive-image ${
            isScrolled ? "nav-main-responsive-image-scrolled" : ""
          }`}
        >
          <Link href="/" className="nav-main-responsive-image-link">
            <Image
              src="/elbacatalini-logo-trans-rojo.png"
              alt="Logo-Main"
              width={500}
              height={500}
              className="nav-main-responsive-image"
              priority
            />
          </Link>
        </li>
      </ul>
      <ul className="nav-main-menu">
        <li className="nav-main-menu-cart-container">
          <NavCart />
        </li>
        <li>
          <Suspense fallback={<DropdownSelectFallback />}>
            <DropdownSelect />
          </Suspense>
        </li>
      </ul>
      <div className="nav-main-search-responsive-container">
          <NavSearch />
      </div>
    </nav>
  );
}

export default NavMain;
