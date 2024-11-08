import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

import "./baimlProductCard.css";

function ProductCard({ prod }) {
  const [quantity, setQuantity] = useState("1");
  const { addProductToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [popToast, setPopToast] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  const handleAddToCart = async (id) => {
    try {
      setLoading(true);
      if((quantity) < 1 ) setQuantity(1);
      const res = await addProductToCart(id, quantity);
      const addedProduct = res.data;
      setPopToast(addedProduct);
      setLoading(false);
      setTimeout(() => {
        setPopToast(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
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
    <div className={`baiml-p-card ${loading ? "loading" : ""}`}>
      {loading && (
        <div className="baiml-p-card-spinner-overlay">
          <div className="baiml-p-card-spinner"></div>
        </div>
      )}
      <div className="baiml-p-card-img-container">
        <Link
          href={`/products/${prod.productId}`}
          className="baiml-p-card-img-link"
        >
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
        <Link
          href={`/products/${prod.productId}`}
          className="baiml-p-card-info-link"
        >
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
        <button
          className="baiml-p-card-add-button"
          onClick={() => handleAddToCart(prod.productId)}
        >
          Añadir al carrito
        </button>
      </div>
      {popToast && (
        <div
          className={`baiml-p-card-toast ${
            isScrolled ? "baiml-p-card-toast-scrolled" : ""
          }`}
        >
          <p>
            {`${popToast.name} x${popToast.quantity} `}
            <span className="baiml-p-card-toast-span">
              se agrego al carrito.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
