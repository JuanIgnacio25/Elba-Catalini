import "@/components/Fallbacks/ProductsMainFallback/productsMainFallback.css"

import Link from "next/link";

import { RxRows } from "react-icons/rx";

import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function ProductsMainFallback({categories,enabled}) {

  return (
    <div className="products-main-fallback-container">
      <div className="products-main-fallback">
        <div>
          <div className="flex flex-col  items-start mb-2 ">
            <h3 className="flex items-center text-gray-800 text-base sm:text-xl lg:text-2xl font-bold">Categorias</h3>
          </div>
          
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
        <div className="products-main-cards-fallback">
          <FallbackSpinner/>
        </div>
      </div>
    </div>
  );
}

export default ProductsMainFallback;
