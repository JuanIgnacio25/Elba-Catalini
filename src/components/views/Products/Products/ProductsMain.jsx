"use client";

import { useSearchParams } from "next/navigation";
import { useProduct } from "@/context/ProductContext";

import ProductsCards from "@/components/views/Products/Products/ProductsCards";
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
      <div className="store-products-loading">
        <FallbackSpinner />
      </div>
    );

  return (
    <div className="store-products">
      {filteredProducts.length > 0 ? (
        <ProductsCards products={filteredProducts} />
      ) : (
        <p>{`No se encontraron productos para "${searchQuery}".`}</p>
      )}
    </div>
  );
}

export default ProductsMain;
