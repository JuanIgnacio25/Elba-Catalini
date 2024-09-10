import BaimlPCards from "@/components/views/Products/Baiml/BaimlPCards";
import BaimlPCategories from "@/components/views/Products/Baiml/BaimlPCategories";

function BaimlPMain() {
  return (
    <div className="baiml-p-standard-container">
      <div className="baiml-p-main-container">
        <BaimlPCategories/>
        <BaimlPCards/>
      </div>
    </div>
  )
}

export default BaimlPMain