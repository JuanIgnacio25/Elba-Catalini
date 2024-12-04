"use client";

import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/context/ProductContext";

import ProductsCards from "@/components/common/ProductsCards/ProductsCards";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";
import { useEffect } from "react";

function StoreProductsMain() {
  const { filterStoreProductsByCategory, loading } = useProduct();
  const { category, subcategory } = useParams();
  const router = useRouter();

  const filteredProducts = filterStoreProductsByCategory(category, subcategory);

  // Manejo de redirección en caso de que no haya productos
  useEffect(() => {
    if (!loading && !filteredProducts.length) {
      router.push("/not-found");
    }
  }, [loading, filteredProducts, router]);

  if (loading)
    return (
      <div className="store-products-loading">
        <FallbackSpinner />
      </div>
    );

  // Mientras redirige, no renderiza nada
  if (!filteredProducts.length) return null;

  return (
    <div className="store-products">
      <ProductsCards products={filteredProducts} />
    </div>
  );
}

export default StoreProductsMain;