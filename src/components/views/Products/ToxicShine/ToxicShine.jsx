import "@/components/views/Products/ToxicShine/toxicShine.css"

import PathHeader from "@/components/common/PathHeader/PathHeader"
import ToxicShineMain from "@/components/views/Products/ToxicShine/ToxicShineMain"

import { Suspense } from "react"

function ToxicShine() {
  return (
    <div className="toxic-products-container">
      <PathHeader/>
      <Suspense fallback={<div>..Loading</div>}>
        <ToxicShineMain/>
      </Suspense>
    </div>
  )
}

export default ToxicShine