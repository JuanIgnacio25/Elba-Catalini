import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/context/CartContext";
import { toast } from "sonner"

function SimplifiedViewProductCard({ prod }) {
  const { addProductToCart } = useCart();
  const [quantity, setQuantity] = useState("1");
  const [loadingAddToCart, setloadingAddToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      setloadingAddToCart(true);
      const res = await addProductToCart(prod.productId, quantity);
      toast.success(`${res.data.name} x ${res.data.quantity} se agrego al carrito.`);
      setloadingAddToCart(false);
    } catch (error) {
      setloadingAddToCart(false);
      console.log(error);
    }
  };

  return (
    <div className="simplified-view-product-card">
      <div className="simplified-view-product-card-image-container">
        <Link
          href={`/products/${prod.productId}`}
          className="simplified-view-product-card-image-link"
        >
          <Image
            className="simplified-view-product-card-image"
            src={prod.images[0].url}
            alt="Product Image"
            width={485}
            height={485}
            priority
          />
        </Link>
      </div>
      <div className="simplified-view-product-card-info">
        <div className="simplified-view-product-card-info-name-container">
          <p className="simplified-view-product-card-info-name">{prod.sku}</p>
        </div>
        <div className="simplified-view-product-card-info-add-container">
          <input
            className="simplified-view-product-card-info-add-input"
            type="number"
            name="quantity-input"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className="simplified-view-product-card-info-add-button"
            onClick={handleAddToCart}
            disabled={loadingAddToCart}
          >
            {loadingAddToCart ? (
              <span className="simplified-view-product-card-info-add-button-spinner"></span>
            ) : (
              "Añadir al carrito"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimplifiedViewProductCard;
