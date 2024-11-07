import "@/components/views/Products/Store/storeProducts.css";

import PathHeader from "@/components/common/PathHeader/PathHeader";
import ProductsCards from "@/components/views/Products/Products/ProductsCards";

function Products() {
  return (
    <div className="store-products-container">
      <PathHeader />
      <div className="store-products">
        <ProductsCards />
      </div>
    </div>
  );
}

export default Products;