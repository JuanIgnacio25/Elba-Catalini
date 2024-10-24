"use client";

import { useState , useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

import axios from "axios";

import CartCard from "@/components/views/Cart/CartCard";
import CartCloseOrder from "@/components/views/Cart/CartCloseOrder";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function CartCards() {
  const router = useRouter();

  const { cart, loading, clearTheCart, fetchCart } = useCart();

  const [closedOrder, setClosedOrder] = useState(false);
  const [loadingCloseOrder, setLoadingCloseOrder] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCloseOrder = async () => {
    try {
      setLoadingCloseOrder(true);
      await axios.post(`/api/orders/close-order`, { cartData: cart });
      fetchCart()
      setClosedOrder(true);
      setLoadingCloseOrder(false);
    } catch (error) {
      fetchCart();
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (closedOrder) {
      router.push("/cart/closedOrder");
    }
  }, [closedOrder, router]);

  if (loadingCloseOrder)
    return (
      <div className="cart-main">
        <div className="cart-main-title">
          <h1>Detalles del Pedido</h1>
        </div>
        <div className="cart-cards-container">
          <table className="cart-cards">
            <thead>
              <tr>
                <th></th>
                <th>Producto</th>
                <th>Unidad</th>
                <th>Cantidad</th>
                <th>
                  <button className="card-cards-clean-cart-button">
                    Vaciar carrito
                  </button>
                </th>
              </tr>
            </thead>
          </table>
          <div className="cart-cards-fallback">
            <FallbackSpinner />
          </div>
        </div>
      </div>
    );

  if (loading) {
    return (
      <div className="cart-main">
        <div className="cart-main-title">
          <h1>Detalles del Pedido</h1>
        </div>
        <div className="cart-cards-container">
          <table className="cart-cards">
            <thead>
              <tr>
                <th></th>
                <th>Producto</th>
                <th>Unidad</th>
                <th>Cantidad</th>
                <th>
                  <button className="card-cards-clean-cart-button">
                    Vaciar carrito
                  </button>
                </th>
              </tr>
            </thead>
          </table>
          <div className="cart-cards-fallback">
            <FallbackSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="cart-empty-container">
        <p className="cart-empty-title">El carrito está vacío</p>
        <Link href={"/products/baiml"} className="cart-empty-button-container">
          <button className="cart-empty-button">Volver a la Tienda</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-main">
      {error && (
        <div className="cart-main-error-container">
          <p className="cart-main-error">{error}</p>
        </div>
      )}
      <div className="cart-main-title">
        <h1>Detalles del Pedido</h1>
      </div>
      <div className="cart-cards-container">
        <table className="cart-cards">
          <thead>
            <tr>
              <th></th>
              <th>Producto</th>
              <th>Unidad</th>
              <th>Cantidad</th>
              <th>
                <button
                  className="card-cards-clean-cart-button"
                  onClick={openModal}
                >
                  Vaciar carrito
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((prod) => (
              <CartCard key={prod.productId} product={prod} />
            ))}
          </tbody>
        </table>
      </div>
      <CartCloseOrder handleCloseOrder={handleCloseOrder} />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={clearTheCart}
      >
        Esta seguro que desea eliminar todos los productos del carrito?
      </ConfirmModal>
    </div>
  );
}

export default CartCards;
