import "./baimlProducts.css"
import BaimlPHeader from "@/components/views/Products/Baiml/BaimlPHeader"
import BaimlPTitles from "@/components/views/Products/Baiml/BaimlPTitles"
import BaimlPMain from "@/components/views/Products/Baiml/BaimlPMain"

function BaimlProducts() {
  return (
    <div className="baiml-p">
      <BaimlPHeader/>
      <BaimlPTitles/>
      <BaimlPMain/>
    </div>
  )
}

export default BaimlProducts