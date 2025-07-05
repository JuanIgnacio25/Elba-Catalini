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
      <div className="w-full flex justify-center">
        <h1 className="w-[90%] md:w-[80%] text-3xl text-red-500 font-bold">Toxic Shine</h1>
      </div>
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
