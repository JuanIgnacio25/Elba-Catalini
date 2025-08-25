"use client";

import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/context/ProductContext";

import ProductsCards from "@/components/common/ProductsCards/ProductsCards";
import ProductCard from "@/components/common/ProductCard/ProductCard"
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";
import { useEffect } from "react";

function StoreProductsMain() {
  const { filterStoreProductsByCategory, loading } = useProduct();
  const { category, subcategory , variantSubCategory} = useParams();
  const router = useRouter();

  const filteredProducts = filterStoreProductsByCategory(category, subcategory , variantSubCategory);

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

  const pageTitle =
  variantSubCategory || subcategory || category || "Productos";

  return (
    <div className="store-products">
      <h1 className="text-3xl text-red-500 font-bold mb-4 text-left capitalize">
        {decodeURIComponent(pageTitle.replace(/-/g, " "))}
      </h1>
      <ProductsCards products={filteredProducts} ITEMS_PER_PAGE={30} ProductCard={ProductCard}/>
    </div>
  );
}

export default StoreProductsMain;