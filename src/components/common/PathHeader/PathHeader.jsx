"use client";

import "./pathHeader.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function PathHeader() {
  const path = usePathname();
  const pathArray = path.split("/").slice(1).map(decodeURIComponent);

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
    <div className={`path-header-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="path-header">
        {pathArray.map((namePath, index, arr) => {
          if (namePath === "store") return null;
          if (namePath == "") {
            return (
              <div key={index} className="path-header-url">
                <Link href="/products">Productos</Link>
                <div>/</div>
                <Link href="/products/baiml">Baiml</Link>
              </div>
            );
          }
          return (
            <div key={index} className="path-header-url">
              <Link href={`/${arr.slice(0, index + 1).join("/")}`}>
                {namePath === "products"
                  ? "Productos"
                  : namePath === "simplifiedView"
                  ? "Vista Simplificada"
                  : `${namePath[0].toUpperCase() + namePath.slice(1)}`}
              </Link>
              <div>/</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PathHeader;
