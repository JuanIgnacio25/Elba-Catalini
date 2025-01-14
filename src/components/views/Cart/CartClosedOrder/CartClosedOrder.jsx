import "@/components/views/Cart/CartClosedOrder/cartClosedOrder.css";

import { IoIosCheckmarkCircle } from "react-icons/io";

import Link from "next/link";

function CartClosedOrder() {
  return (
    <div className="cart-closed-order-container">
      <div className="cart-closed-order">
        <div className="flex flex-col bg-green-200 p-3 gap-2">
          <div className="flex flex-row justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-green-900">
            <IoIosCheckmarkCircle />
            <h3> ¡Pedido recibido con éxito!</h3>
          </div>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-center">
            Nuestro equipo de compras se pondrá en contacto con usted para
            enviarle el presupuesto, y luego coordinar el pago.
          </p>
        </div>
        <Link
          href={"/products/baiml"}
          className="cart-closed-order-button-container"
        >
          <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-black font-semibold text-xs md:text-sm lg:text-base">
            Volver a la Tienda
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CartClosedOrder;
