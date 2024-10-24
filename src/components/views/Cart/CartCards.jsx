"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

import CartCard from "@/components/views/Cart/CartCard";
import CartCloseOrder from "@/components/views/Cart/CartCloseOrder";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function CartCards() {
  const [cart, setCart] = useState(null);
  const [closedOrder, setClosedOrder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/carts");
      if (res.data && res.data.cart) {
        setCart(res.data.cart);
      } else {
        console.log("Formato de respuesta no válido");
      }
    } catch (error) {
      console.log("Error al obtener el carrito");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/carts/products/${id}`);
      fetchCart();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleCleanCart = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/carts/products");
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseOrder = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/orders/close-order`, { cartData: cart });
      setClosedOrder(true);
      setLoading(false);
    } catch (error) {
      fetchCart();
      setError(error.response.data.message);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const updatedProducts = cart.products.map((product) =>
        product.productId === productId
          ? { ...product, quantity: newQuantity }
          : product
      );
      setCart({ ...cart, products: updatedProducts });
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

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

  if (closedOrder) {
    return (
      <div className="cart-closed-order-container">
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
              <CartCard
                key={prod.productId}
                product={prod}
                handleDelete={handleDelete}
                updateQuantity={updateQuantity}
              />
            ))}
          </tbody>
        </table>
      </div>
      <CartCloseOrder handleCloseOrder={handleCloseOrder} />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleCleanCart}
      >
        Esta seguro que desea eliminar todos los productos del carrito?
      </ConfirmModal>
    </div>
  );
}

export default CartCards;
