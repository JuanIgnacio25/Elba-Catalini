import "./storeProducts.css";

import PathHeader from "@/components/common/PathHeader/PathHeader";
import StoreProductsMain from "./StoreProductsMain";

function StoreProducts() {
  return (
    <div className="store-products-container">
      <PathHeader />
      <StoreProductsMain/>
    </div>
  );
}

export default StoreProducts;
