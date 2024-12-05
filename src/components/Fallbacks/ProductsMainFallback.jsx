import Link from "next/link";

import { RxRows } from "react-icons/rx";

import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function ProductsMainFallback({categories,enabled}) {

  return (
    <div className="baiml-p-standard-container">
      <div className="baiml-p-main-container">
        <div className="baiml-p-main-categories">
          <h3 className="products-categories-title">Categorias</h3>
          <div className={`${enabled ? "products-categories-simplified-view-button-container" : "product-categories-simplified-view-button-disabled"}`}>
            <Link href={"/products/baiml/simplifiedView"}>
              <button className="products-categories-simplified-view-button">
                {" "}
                <RxRows />
                Vista simplificada
              </button>
            </Link>
          </div>
          {categories.map((category, index) => (
            <div
              className="filter-checkbox-container"
              key={index}
            >
              <div className={`filter-checkbox`}></div>
              <div className="filter-checkbox-label">
                <p>{category}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="baiml-p-main-cards-fallback">
          <FallbackSpinner/>
        </div>
      </div>
    </div>
  );
}

export default ProductsMainFallback;
