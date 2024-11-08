"use client"

import Link from "next/link";
import { useState, useEffect } from "react";

function SimplifiedViewHeader() {
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
    <div className={`simplified-view-header-container ${isScrolled ? "scrolled": ""}`}>
      <div className="simplified-view-header">
        <Link href={"/products"}>Productos</Link>
        <div>/</div>
        <Link href={"/products/baiml"}>Baiml</Link>
        <div>/</div>
        <Link href={"/products/baiml/simplifiedView"}>Vista Simplificada</Link>
      </div>
    </div>
  );
}

export default SimplifiedViewHeader;
