"use client";

import Link from "next/link";

function ProductDetailHeader({ product }) {

  return (
    <div
      className={`product-detail-header-container`}
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
      </div>
    </div>
  );
}

export default ProductDetailHeader;
