import "@/components/views/Products/Store/storeProducts.css";

import PathHeader from "@/components/common/PathHeader/PathHeader";
import ProductsMain from "./ProductsMain";

function Products() {
  return (
    <div className="store-products-container">
      <PathHeader />
      <ProductsMain/>
    </div>
  );
}

export default Products;