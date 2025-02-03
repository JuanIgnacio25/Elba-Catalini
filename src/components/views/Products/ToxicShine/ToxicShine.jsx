import "@/components/views/Products/ToxicShine/toxicShine.css";

import PathHeader from "@/components/common/PathHeader/PathHeader";
import ToxicShineMain from "@/components/views/Products/ToxicShine/ToxicShineMain";
import ProductsMainFallback from "@/components/Fallbacks/ProductsMainFallback/ProductsMainFallback";

import { TOXIC_SHINE_CATEGORIES } from "@/constants/categories";

import { Suspense } from "react";

function ToxicShine() {
  return (
    <div className="toxic-products-container">
      <PathHeader />
      <Suspense
        fallback={
          <ProductsMainFallback
            categories={TOXIC_SHINE_CATEGORIES}
            enabled={false}
          />
        }
      >
        <ToxicShineMain />
      </Suspense>
    </div>
  );
}

export default ToxicShine;
