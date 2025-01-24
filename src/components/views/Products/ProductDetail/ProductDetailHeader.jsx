"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function ProductDetailHeader({ product }) {
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
    <div
      className={`product-detail-header-container ${
        isScrolled ? "product-detail-header-container-scrolled" : ""
      }`}
    >
      <div className="product-detail-header">
        <div className="flex align-center gap-1">
          <Link href={"/products"}>Productos</Link>
          <div>/</div>
        </div>
        {product.kind === "Baiml" && (
          <>
            <div className="flex align-center gap-1">
              <Link href={`/products/baiml`}>Baiml</Link>
              <div>/</div>
            </div>
            <div className="flex align-center gap-1">
              <Link href={`/products/category/Baiml/${product.category}`}>{product.category}</Link>
              <div>/</div>
            </div>
          </>
        )}
        {product.kind === "Store" && product.category === "Toxic Shine" && (
          <>
            <div className="flex align-center gap-1">
              <Link href={`/products/toxic-shine`}>Toxic-shine</Link>
              <div>/</div>
            </div>
            <div className="flex align-center gap-1">
              <Link href={`/products/category/Store/${product.subCategory}`}>
                {product.subCategory}
              </Link>
              <div>/</div>
            </div>
          </>
        )}
        {product.kind === "Store" && product.category !== "Toxic Shine" && (
          <>
            <div className="flex align-center gap-1">
              <Link href={`/products/store/${product.category}`}>{product.category}</Link>
              <div>/</div>
            </div>
            <div className="flex align-center gap-1">
              <Link href={`/products/store/${product.category}/${product.subCategory.split(" ").join("-")}`}>
                {product.subCategory}
              </Link>
              <div>/</div>
            </div>
          </>
        )}
        <div className="flex align-center gap-1">
          <div>{product.name}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailHeader;
