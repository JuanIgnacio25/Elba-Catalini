import "./productDetail.css";

import ProductDetailInfo from "@/components/views/Products/ProductDetail/ProductDetailInfo";
import ProductDetailCarouselSlider from "@/components/views/Products/ProductDetail/ProductDetailCarouselSlider";
import ProductDetailHeader from "@/components/views/Products/ProductDetail/ProductDetailHeader";

function ProductDetailMain({product}) {
  return (
    <div className="product-detail-container">
      <ProductDetailHeader product={product} />
      <div className="product-detail-main-container">
        <div className="product-detail-main-carousel-slider">
          <ProductDetailCarouselSlider product={product} />
        </div>
        <div className="product-detail-main-info-container">
          <ProductDetailInfo product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailMain;
