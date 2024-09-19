"use client"

import {useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";

import DropdownSelectWrapper from "@/components/NavBar/DropdownSelectWrapper";

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
        <li className="nav-main-search">
          <input placeholder="¿Que estas buscando?" name="nav-main-search-input"/>
          <button>
            <IoSearchSharp className="nav-main-search-icon" />
          </button>
        </li>
      </ul>
      <ul className="nav-main-menu">
        <li className="nav-main-menu-cart-container">
          <Link href="/cart">
            <BsCart3 className="nav-main-menu-icon-cart" />
          </Link>
        </li>
        <li >
          <DropdownSelectWrapper/>
        </li>
      </ul>
    </nav>
  );
}

export default NavMain;
