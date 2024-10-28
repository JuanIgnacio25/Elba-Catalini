"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
          <Link href="/products/baiml">Productos Baiml</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavDesktop;
