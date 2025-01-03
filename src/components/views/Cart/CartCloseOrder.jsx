"use client"

import { useRouter } from "next/navigation";

function CartCloseOrder() {

  const router = useRouter();

  return (
    <div className="cart-close-container">
      <div className="cart-close">
        <button className="cart-close-button" onClick={() => router.push("/cart/confirmOrder")}>Continuar pedido</button>
      </div>
    </div>
  );
}

export default CartCloseOrder;
