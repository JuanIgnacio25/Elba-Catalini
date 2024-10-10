import "./productDetail.css";
import ProductDetailMain from "@/components/views/Products/ProductDetail/ProductDetailMain";
import ProductDetailHeader from "@/components/views/Products/ProductDetail/ProductDetailHeader";

function ProductDetail() {
  return (
    <div className="product-detail-container">
      <ProductDetailHeader/>
      <div className="product-detail">
        <ProductDetailMain/>
      </div>
    </div>
  )
}

export default ProductDetail 