"use client";

import { useProduct } from "@/context/ProductContext";
import StoreProductCard from "@/components/views/Products/Store/StoreProductCard";

function ProductsCards() {
  const { allProducts } = useProduct();

  return (
    <div className="store-products-cards">
      {allProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
    </div>
  );
}

export default ProductsCards;