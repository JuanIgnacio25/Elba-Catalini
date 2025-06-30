import "@/components/common/ProductCard/productCard.css";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

import formatStoreProductUnit from "@/utils/formatStoreProductUnit";

import { formatBaimlProductQuantityLabel } from "@/utils/formatBaimlProductQuantity";
import { formatBaimlProductSetLabel } from "@/utils/formatBaimlProductQuantity";
import { toast } from "sonner"

function ProductCard({ prod }) {
  const [quantity, setQuantity] = useState("1");
  const { addProductToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (id) => {
    try {
      setLoading(true);
      if (quantity < 1) setQuantity(1);
      const res = await addProductToCart(id, quantity);
      toast.success(`${res.data.name} x ${res.data.quantity} se agrego al carrito.`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
          <p className="product-card-info-unit">
            {prod.kind === "Baiml"
              ? `${formatBaimlProductQuantityLabel(
                  prod.category,
                  prod.sku,
                  prod.kind
                )} x ${prod.unit} ${formatBaimlProductSetLabel(
                  prod.productSet,
                  prod.unit
                )} `
              : `Cantidad x ${formatStoreProductUnit(
                  prod.subCategory,
                  prod.unit
                )}`}
          </p>
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
    </div>
  );
}

export default ProductCard;
