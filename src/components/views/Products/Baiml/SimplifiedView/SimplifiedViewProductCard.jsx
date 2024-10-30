import Image from "next/image";
import Link from "next/link";

function SimplifiedViewProductCard({ prod }) {
  return (
    <div className="simplified-view-product-card">
      <div className="simplified-view-product-card-image-container">
        <Link
          href={"/products/baiml/simplifiedView"}
          className="simplified-view-product-card-image-link"
        >
          <Image
            className="simplified-view-product-card-image"
            src={"/1010E.A.jpg"}
            alt="Product Image"
            width={485}
            height={485}
            priority
          />
        </Link>
      </div>
      <div className="simplified-view-product-card-info">
        <div className="simplified-view-product-card-info-name-container">
          <p className="simplified-view-product-card-info-name">1010E.A</p>
        </div>
        <div className="simplified-view-product-card-info-add-container">
          <input
            className="simplified-view-product-card-info-add-input"
            type="number"
            min="1"
          />
          <button className="simplified-view-product-card-info-add-button">
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimplifiedViewProductCard;
