"use client";

import "@/components/views/Orders/OrderDetail/orderDetail.css";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useCart } from "@/context/CartContext";

import OrderDetailProductCard from "@/components/views/Orders/OrderDetail/OrderDetailProductCard";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function OrderDetailCard() {
  const params = useParams();
  const {fetchCart} = useCart();
  const router = useRouter();
  const id = params.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openModal = (id) => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/orders/${id}`);
      setOrder(res.data);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRepeatOrder = async () => {
    try {
      await axios.post(`/api/orders/repeat-order/${order.orderId}`);
      await fetchCart();
      router.refresh()
      router.push("/cart");
      closeModal();
    } catch (error) {
      setError(error.response.data.message)
      closeModal();
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (error) {
    return(
      <div className="order-detail-container">
        <div className="order-detail">
          <div className="order-detail-return">
            <Link href="/orderHistory">
              <FaArrowLeftLong />
            </Link>
          </div>
          <div className="order-detail-error">
              <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading)
    return (
      <div className="order-detail-container">
        <div className="order-detail">
          <div className="order-detail-return">
            <Link href="/orderHistory">
              <FaArrowLeftLong />
            </Link>
          </div>
          <div className="orders-spinner-container">
            <FallbackSpinner/>
          </div>
        </div>
      </div>
    );

  return (
    <div className="order-detail-container">
      <div className="order-detail">
        <div className="order-detail-return">
          <Link href="/orderHistory">
            <FaArrowLeftLong />
          </Link>
        </div>
        <div className="order-detail-header">
          <div className="order-detail-header-data">
            <h1 className="order-detail-header-data-title">
              Numero de orden: {order.orderId}
            </h1>
            <p>
              <span className="order-detail-header-data-span">Fecha:</span>
              {` ${new Date(order.createdAt).toLocaleString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires",
                dateStyle: "short",
              })}`}
            </p>
          </div>
          <div className="order-detail-header-repeat-order">
            <button className="order-detail-header-repeat-order-button" onClick={openModal}>
              Repetir pedido
            </button>
          </div>
        </div>
        <div className="order-detail-products-container">
          <table className="order-detail-products">
            <thead>
              <tr>
                <th className="order-detail-products-th">Productos</th>
                <th className="order-detail-quantity-th">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((prod) => (
                <OrderDetailProductCard key={prod.productId} product={prod} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleRepeatOrder}
      >
        El carrito se llenará con el pedido que seleccionó y se borrará el resto de los items que tiene ahora. ¿Desea continuar?
      </ConfirmModal>
    </div>
  );
}

export default OrderDetailCard;
