import Image from "next/image";

function ProductDetailCarouselSlider({product}) {
  return (
    <div className="product-detail-main-carousel-slider-container">
      <Image
            src="/1010E.A.jpg"
            alt="Logo-Product"
            width={300}
            height={300}
            priority
          />
    </div>
  )
}

export default ProductDetailCarouselSlider