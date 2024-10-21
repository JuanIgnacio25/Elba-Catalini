import { useState } from "react";
import Image from "next/image";
import "./productDetail.css";

function ProductDetailCarouselSlider({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="product-detail-carousel-slider-container">
      <div className="product-detail-carousel-slider">

        <div className="product-deatil-carousel-slider-side-bar">
          {product.images.map((image, index) => (
            <div key={index} className="product-deatil-carousel-slider-side-bar-image-container">
              <Image
                src={image}
                alt={`${product.name} image`}
                width={"70"}
                height={"30"}
                className={`product-deatil-carousel-slider-side-bar-image ${
                  selectedImage === image ? "selected" : ""
                }`}
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>

        <div className="product-deatil-carousel-slider-main-image-container">
          <Image
            src={selectedImage}
            alt="Selected Product Image"
            width={"300"}
            height={"300"}
            className="product-deatil-carousel-slider-main-image"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCarouselSlider;
