import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

import { formatBaimlProductQuantityLabel } from "@/utils/formatBaimlProductQuantity";
import { formatBaimlProductSetLabel } from "@/utils/formatBaimlProductQuantity";

import { BiCategory } from "react-icons/bi";

function ProductDetailInfo({ product }) {
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const { addProductToCart } = useCart();
  const [quantity, setQuantity] = useState("1");
  const [popToast, setPopToast] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  const handleAddToCart = async (id) => {
    try {
      setLoadingAddToCart(true);
      const res = await addProductToCart(id, quantity);
      const addedProduct = res.data;
      setPopToast(addedProduct);
      setLoadingAddToCart(false);
      setTimeout(() => {
        setPopToast(false);
      }, 3000);
    } catch (error) {
      setLoadingAddToCart(false);
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
    <div className="product-detail-main-info">
      <h1 className="product-detail-main-info-name">{product.name}</h1>
      <h3 className="product-detail-main-info-sku">SKU: {product.sku}</h3>
      <div className="flex flex-row justify-start items-center gap-2">
        <BiCategory className="text-xl" />
        <Link
          href={
            product.kind === "Store" && product.category !== "Toxic Shine"
              ? `/products/store/${product.category}/${product.subCategory.split(" ").join("-")}`
              : `/products/category/${
                  product.kind === "Baiml"
                    ? `Baiml/${product.category}`
                    : `Store/${product.subCategory}`
                }`
          }
          className=" text-red-500 hover:text-red-700 font-semibold"
        >
          {product.kind === "Baiml" ? product.category : product.subCategory}
        </Link>
      </div>
      <div className="product-detail-main-info-add">
        <input
          className="product-detail-main-info-add-input"
          name="product-detail-main-info-quantity-input"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button
          className={`product-detail-main-info-add-button`}
          onClick={() => handleAddToCart(product.productId)}
          disabled={loadingAddToCart}
        >
          {loadingAddToCart ? (
            <span className="product-detail-main-info-add-button-spinner"></span>
          ) : (
            "Añadir al carrito"
          )}
        </button>
      </div>
      <div className="product-detail-main-info-unit-container">
        <p className="product-detail-main-info-unit">
          {formatBaimlProductQuantityLabel(
            product.category,
            product.sku,
            product.kind
          )}{" "}
          x {product.unit}{" "}
          {formatBaimlProductSetLabel(product.productSet, product.unit)}{" "}
        </p>
      </div>
      <h3 className="product-detail-main-info-description">Descripcion</h3>
      <div className="product-detail-main-info-description-text">
        {product.description}
      </div>
      {popToast && (
        <div
          className={`product-detail-main-toast ${
            isScrolled ? "product-detail-main-toast-scrolled" : ""
          }`}
        >
          <p>
            {`${popToast.name} x${popToast.quantity} `}
            <span className="product-detail-main-toast-span">
              se agrego al carrito.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductDetailInfo;
