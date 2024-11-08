import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

import { TiDeleteOutline } from "react-icons/ti";

function CartCard({ product }) {
  const {deleteProductFromCart, updateQuantity} = useCart();

  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    updateQuantity(product.productId, newQuantity);
  };

  return (
    <tr>
      <td className="cart-card-img-td">
        <div className="cart-card-img-container">
          <Link href={`/products/${product.productId}`} className="cart-card-img-link">
            <Image
              className="cart-card-img"
              src={product.images[0]}
              alt="Logo-Product"
              width={485}
              height={485}
              priority
            />
          </Link>
        </div>
      </td>
      <td>
        <p className="cart-card-product-info">{product.name}</p>
      </td>
      <td>
        <p className="cart-card-product-info">x {product.unit}</p>
      </td>
      <td>
        <div className="cart-card-quantity-container">
          <input
            className="cart-card-quantity-input"
            type="number"
            min="1"
            name="cart-product-quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
      </td>
      <td>
        <div className="cart-card-delete-button-container">
          <TiDeleteOutline
            className="cart-card-delete-button"
            onClick={() => deleteProductFromCart(product.productId)}
          />
        </div>
      </td>
    </tr>
  );
}

export default CartCard;