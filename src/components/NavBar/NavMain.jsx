"use client"

import {useState,useEffect , Suspense} from "react";

import Link from "next/link";
import Image from "next/image";

import DropdownSelectFallback from "@/components/Fallbacks/DropdownSelectFallback";
/* import DropdownSelectWrapper from "@/components/NavBar/DropdownSelectWrapper"; */
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nav-main ${isScrolled ? "nav-main-scrolled":""}`}>
      <ul className="nav-main-responsive-image-container">
        <li>
          <Link href="/">
            <Image
              src="/logo-main.png"
              alt="Logo-Main"
              width={800}
              height={169} 
              className="nav-main-responsive-image"
              priority 
            />
          </Link>
        </li>
      </ul>
      <ul className="nav-main-search-container">   
          <NavSearch/>
      </ul>
      <ul className="nav-main-menu">
        <li className="nav-main-menu-cart-container">
          <NavCart/>
        </li>
        <li >
          <Suspense fallback={DropdownSelectFallback}>
            <DropdownSelect/>
          </Suspense>
          
          {/* <DropdownSelectWrapper/> */}
        </li>
      </ul>
    </nav>
  );
}

export default NavMain;
