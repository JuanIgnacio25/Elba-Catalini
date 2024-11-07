import "./storeProducts.css";

import PathHeader from "@/components/common/PathHeader/PathHeader";
import StoreProductsCards from "@/components/views/Products/Store/StoreProductsCards";

function StoreProducts() {
  return (
    <div className="store-products-container">
      <PathHeader />
      <div className="store-products">
        <StoreProductsCards />
      </div>
    </div>
  );
}

export default StoreProducts;
