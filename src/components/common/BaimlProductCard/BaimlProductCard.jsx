import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatBaimlProductQuantityLabel } from "@/utils/formatBaimlProductQuantity";
import { formatBaimlProductSetLabel } from "@/utils/formatBaimlProductQuantity";
import { toast } from "sonner";

import "./baimlProductCard.css";

function ProductCard({ prod }) {
  const [quantity, setQuantity] = useState("1");
  const { addProductToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (id) => {
    try {
      setLoading(true);
      if (quantity < 1) setQuantity(1);
      const res = await addProductToCart(id, quantity);
      toast.success(
        `${res.data.name} x ${res.data.quantity} se agregó al carrito.`
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <article
      className={`baiml-p-card ${loading ? "loading" : ""}`}
      itemScope
      itemType="https://schema.org/Product"
    >
      {loading && (
        <div className="baiml-p-card-spinner-overlay">
          <div className="baiml-p-card-spinner"></div>
        </div>
      )}

      {/* Imagen y nombre del producto */}
      <figure className="baiml-p-card-img-container">
        <Link
          href={`/products/${prod.productId}/${prod.slug}`}
          className="baiml-p-card-img-link"
        >
          <Image
            className="baiml-p-card-img"
            src={prod.images[0].url}
            alt={`Foto de ${prod.name}`}
            width={485}
            height={485}
            loading="lazy"
            itemProp="image"
          />
        </Link>
        <figcaption className="sr-only">{prod.name}</figcaption>
      </figure>

      {/* Información principal */}
      <div className="baiml-p-card-info">
        <Link
          href={`/products/${prod.productId}/${prod.slug}`}
          className="baiml-p-card-info-link"
        >
          <h2 itemProp="name">{prod.name}</h2>
          <p className="baiml-p-card-info-unit" itemProp="description">
            {formatBaimlProductQuantityLabel(
              prod.category,
              prod.sku,
              prod.kind
            )}{" "}
            x {prod.unit}{" "}
            {formatBaimlProductSetLabel(prod.productSet, prod.unit)}
          </p>
        </Link>
      </div>

      <div
        className="baiml-p-card-add"
        itemProp="offers"
        itemScope
        itemType="https://schema.org/Offer"
      >
        <meta itemProp="priceCurrency" content="ARS" />
        <link itemProp="availability" href="https://schema.org/InStock" />
        <link itemProp="itemCondition" href="https://schema.org/NewCondition" />

        <input
          className="baiml-p-card-add-input"
          name="baiml-product-quantity-input"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          aria-label="Cantidad de producto Baiml"
        />

        <button
          className="baiml-p-card-add-button"
          onClick={() => handleAddToCart(prod.productId)}
        >
          Añadir al carrito
        </button>
      </div>
    </article>
  );
}

export default ProductCard;