"use client";

import { useSearchParams } from "next/navigation";
import { useProduct } from "@/context/ProductContext";

import ProductsCards from "@/components/common/ProductsCards/ProductsCards";
import ProductCard from "@/components/common/ProductCard/ProductCard"
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function ProductsMain() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; // Obtenemos el término de búsqueda
  const { allProducts, loading, searchProducts } = useProduct();

  // Filtrar productos según el término de búsqueda
  const filteredProducts = searchQuery
    ? searchProducts(searchQuery)
    : allProducts;

  if (loading)
    return (
      <div className="products-loading">
        <FallbackSpinner />
      </div>
    );

  return (
    <div className="products">
      {filteredProducts.length > 0 ? (
        <ProductsCards products={filteredProducts} ITEMS_PER_PAGE={30} ProductCard={ProductCard}/>
      ) : (
        <p>{`No se encontraron productos para "${searchQuery}".`}</p>
      )}
    </div>
  );
}

export default ProductsMain;
