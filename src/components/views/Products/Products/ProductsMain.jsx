"use client"

import { useProduct } from "@/context/ProductContext";

import ProductsCards from "@/components/views/Products/Products/ProductsCards";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function ProductsMain() {
  const {allProducts, loading} = useProduct();


  if(loading) return <div className="store-products-loading"><FallbackSpinner/></div>;

  return (
    <div className="store-products">
      <ProductsCards products={allProducts}/>
    </div>
  );
}

export default ProductsMain;
