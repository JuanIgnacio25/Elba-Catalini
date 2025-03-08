import "@/components/common/ProductCard/productCard.css"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

import formatStoreProductUnit from "@/utils/formatStoreProductUnit";

function ProductCard({prod}) {
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
    <div className={`product-card ${loading ? "loading" : ""}`}>
      {loading && (
        <div className="product-card-spinner-overlay">
          <div className="product-card-spinner"></div>
        </div>
      )}
      <div className="product-card-img-container">
        <Link
          href={`/products/${prod.productId}`}
          className="product-card-img-link"
        >
          <Image
            className="product-card-img"
            src={prod.images[0].url}
            alt="Logo-Product"
            width={485}
            height={485}
            loading="lazy"
          />
        </Link>
      </div>
      <div className="product-card-info">
        <Link
          href={`/products/${prod.productId}`}
          className="product-card-info-link"
        >
          <p>{prod.name}</p>
          <p className="product-card-info-unit">Cantidad x {formatStoreProductUnit(prod.subCategory,prod.unit)}</p>
        </Link>
      </div>
      <div className="product-card-add">
        <input
          className="product-card-add-input"
          name="product-quantity-input"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          aria-label="Store Product Quantity Input"
        />
        <button
          className="product-card-add-button"
          onClick={() => handleAddToCart(prod.productId)}
        >
          Añadir al carrito
        </button>
      </div>
      {popToast && (
        <div
          className={`product-card-toast ${
            isScrolled ? "product-card-toast-scrolled" : ""
          }`}
        >
          <p>
            {`${popToast.name} x${popToast.quantity} `}
            <span className="product-card-toast-span">
              se agrego al carrito.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductCard