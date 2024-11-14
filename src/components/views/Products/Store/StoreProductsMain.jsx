"use client";

import { useProduct } from "@/context/ProductContext";

import StoreProductsCards from "./StoreProductsCards";

function StoreProductsMain() {
  const { storeProducts, loading } = useProduct();

  if (loading) return <div>...cargando</div>;

  return (
    <div className="store-products">
      <StoreProductsCards storeProducts={storeProducts} />
    </div>
  );
}

export default StoreProductsMain;
