import "./baimlProducts.css"
import PathHeader from "@/components/common/PathHeader/PathHeader";
import BaimlPMain from "@/components/views/Products/Baiml/BaimlPMain"

function BaimlProducts() {
  return (
    <div className="baiml-p">
      <PathHeader/>
      <BaimlPMain/>
    </div>
  )
}

export default BaimlProducts