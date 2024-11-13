import "./baimlProducts.css"
import PathHeader from "@/components/common/PathHeader/PathHeader";
import BaimlPMainFallback from "@/components/Fallbacks/BaimlPMainFallback";
import BaimlPMain from "@/components/views/Products/Baiml/BaimlPMain"

import { Suspense } from "react";

function BaimlProducts() {
  return (
    <div className="baiml-p">
      <PathHeader/>
      <Suspense fallback={<BaimlPMainFallback/>}>
        <BaimlPMain/>
      </Suspense>
    </div>
  )
}

export default BaimlProducts