"use client";

import { useSearchParams } from "next/navigation";
import { useProduct } from "@/context/ProductContext";

import ProductsCards from "@/components/common/ProductsCards/ProductsCards";
import ProductCard from "@/components/common/ProductCard/ProductCard"
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function ProductsMain() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { allProducts, loading, searchProducts } = useProduct();

  const filteredProducts = searchQuery
    ? searchProducts(searchQuery)
    : allProducts;

  return (
    <div className="products">
      <h1 className="text-3xl text-red-500 font-bold mb-4 text-left capitalize">
        Productos
      </h1>

      {loading ? (
        <div className="products-loading">
          <FallbackSpinner />
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductsCards
          products={filteredProducts}
          ITEMS_PER_PAGE={30}
          ProductCard={ProductCard}
        />
      ) : (
        <p>{`No se encontraron productos para "${searchQuery}".`}</p>
      )}
    </div>
  );
}

export default ProductsMain;
