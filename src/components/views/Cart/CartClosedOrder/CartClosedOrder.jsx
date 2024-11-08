import "@/components/views/Cart/cart.css";

import Link from "next/link";

function CartClosedOrder() {
  return (
    <div className="cart-closed-order-container">
      <div className="cart-closed-order">
        <p className="cart-closed-order-title">
          Su pedido ha sido recibido. Nuestro equipo de compras se pondrá en
          contacto con usted para enviarle el presupuesto y coordinar el pago y
          el transporte.
        </p>
        <Link
          href={"/products/baiml"}
          className="cart-closed-order-button-container"
        >
          <button className="cart-closed-order-button">
            Volver a la Tienda
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CartClosedOrder;
