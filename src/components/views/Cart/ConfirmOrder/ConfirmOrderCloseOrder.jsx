import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { useCart } from "@/context/CartContext";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";

function ConfirmOrderCloseOrder({ deliveryOption, handleError, comments, setClosedOrder }) {
  const router = useRouter();
  
  const {cart} = useCart();

  const [loadingCloseOrder, setLoadingCloseOrder] = useState(false);
  const [isCloseCartModalOpen, setIsCloseCartModalOpen] = useState(false);

  const openCloseCartModal = () => setIsCloseCartModalOpen(true);
  const closeCloseCartModal = () => setIsCloseCartModalOpen(false);

  const handleCloseOrder = async () => {
    try {
      setLoadingCloseOrder(true);
      await axios.post(`/api/orders/close-order`, { cartData: { deliveryOption, comments , productsCartInContext:cart.products} });
  
      setClosedOrder(true);
      closeCloseCartModal();
      router.replace("/cart/closedOrder");
  
    } catch (error) {
      closeCloseCartModal();
      handleError(error.response?.data?.message || "Error al cerrar el pedido");
    } finally {
      setLoadingCloseOrder(false);
    }
  };

  if (loadingCloseOrder)
    return (
      <div className="confirm-order-close-order loading" disabled>
        <button className="confirm-order-close-order-button">
          <span className="confirm-order-close-order-loading-spinner"></span>
        </button>
      </div>
    );

  return (
    <div className="confirm-order-close-order">
      <button className="confirm-order-close-order-button" onClick={openCloseCartModal}>
        Cerrar Pedido
      </button>
      <ConfirmModal isOpen={isCloseCartModalOpen} onClose={closeCloseCartModal} onConfirm={handleCloseOrder}>
        ¿Está seguro que desea cerrar el pedido?
      </ConfirmModal>
    </div>
  );
}

export default ConfirmOrderCloseOrder;
