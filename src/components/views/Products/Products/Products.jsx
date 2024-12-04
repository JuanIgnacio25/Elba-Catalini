import "@/components/views/Products/Products/products.css"

import { Suspense } from "react";

import PathHeader from "@/components/common/PathHeader/PathHeader";
import ProductsMain from "@/components/views/Products/Products/ProductsMain";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function Products() {
  return (
    <div className="products-container">
      <PathHeader />
      <Suspense
        fallback={
          <div className="products-loading">
            <FallbackSpinner />
          </div>
        }
      >
        <ProductsMain />
      </Suspense>
    </div>
  );
}

export default Products;
