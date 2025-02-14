import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useCart } from "@/context/CartContext";

function SimplifiedViewProductCard({ prod }) {
  const { addProductToCart } = useCart();
  const [quantity, setQuantity] = useState("1");
  const [popToast, setPopToast] = useState(false);
  const [loadingAddToCart, setloadingAddToCart] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  const handleAddToCart = async () => {
    try {
      setloadingAddToCart(true);
      const res = await addProductToCart(prod.productId, quantity);
      const addedProduct = res.data;
      setPopToast(addedProduct);
      setloadingAddToCart(false);
      setTimeout(() => {
        setPopToast(false);
      }, 3000);
    } catch (error) {
      setloadingAddToCart(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      {popToast && (
        <div
          className={`simplified-view-toast ${
            isScrolled ? "simplified-view-toast-scrolled" : ""
          }`}
        >
          <p>
            {`${popToast.name} x${popToast.quantity} `}
            <span className="simplified-view-toast-span">
              se agrego al carrito.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default SimplifiedViewProductCard;
