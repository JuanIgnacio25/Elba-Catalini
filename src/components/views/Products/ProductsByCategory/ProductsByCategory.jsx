import "./productsByCategory.css";

import ProductsByCategoryHeader from "@/components/views/Products/ProductsByCategory/ProductsByCategoryHeader"
import ProductsByCategoryMain from "@/components/views/Products/ProductsByCategory/ProductsByCategoryMain"

import { Suspense } from "react"

function ProductsByCategory() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ProductsByCategoryHeader/>
      <Suspense fallback={<div>loading...</div>}>
        <ProductsByCategoryMain/>
      </Suspense>
    </div>
  )
}

export default ProductsByCategory