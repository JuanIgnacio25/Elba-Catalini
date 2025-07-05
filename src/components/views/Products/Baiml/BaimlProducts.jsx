import "./baimlProducts.css"
import PathHeader from "@/components/common/PathHeader/PathHeader";
import ProductsMainFallback from "@/components/Fallbacks/ProductsMainFallback/ProductsMainFallback";
import BaimlPMain from "@/components/views/Products/Baiml/BaimlPMain"

import { BAIML_CATEGORIES } from "@/constants/categories";

import { Suspense } from "react";

function BaimlProducts() {
  return (
    <div className="baiml-p">
      <PathHeader/>
      <div className="w-full flex justify-center">
        <h1 className="w-[90%] md:w-[80%] text-3xl text-red-500 font-bold">Faros Baiml</h1>
      </div>
      
      <Suspense fallback={<ProductsMainFallback categories={BAIML_CATEGORIES} enabled={true}/>}>
        <BaimlPMain/>
      </Suspense>
    </div>
  )
}

export default BaimlProducts