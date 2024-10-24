import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

import "./baimlProductCard.css";

function ProductCard({ prod }) {
  const [quantity, setQuantity] = useState("1");
  const { addProductToCart } = useCart();

  const handleAddToCart = async (id) => {
      await addProductToCart(id, quantity);
  };

  return (
    <div className="baiml-p-card">
      <div className="baiml-p-card-img-container">
        <Link href={`/products/${prod.productId}`} className="baiml-p-card-img-link">
          <Image
            className="baiml-p-card-img"
            src={prod.images[0]}
            alt="Logo-Product"
            width={485}
            height={485}
            priority
          />
        </Link>
      </div>
      <div className="baiml-p-card-info">
        <Link href={`/products/${prod.productId}`} className="baiml-p-card-info-link">
          <p>{prod.name}</p>
          <p className="baiml-p-card-info-unit">Caja x {prod.unit}</p>
        </Link>
      </div>
      <div className="baiml-p-card-add">
        <input
          className="baiml-p-card-add-input"
          name="baiml-product-quantity-input"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button className="baiml-p-card-add-button" onClick={() => handleAddToCart(prod.productId)}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
