"use client";

import { useProduct } from "@/context/ProductContext";

import { useEffect, useState } from "react";

import StoreProductsCards from "./StoreProductsCards";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function StoreProductsMain() {
  const { storeProducts, loading } = useProduct();

  if (loading) return <div className="store-products-loading"><FallbackSpinner/></div>;

  return (
    <div className="store-products">
      <StoreProductsCards storeProducts={storeProducts} />
    </div>
  );
}

export default StoreProductsMain;
