import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";

function ConfirmOrderCloseOrder({ fetchCart , deliveryOption , handleError , comments}) {
 
  const router = useRouter();

  const [loadingCloseOrder, setLoadingCloseOrder] = useState(false);
  const [closedOrder, setClosedOrder] = useState(false);
  const [isCloseCartModalOpen , setIsCloseCartModalOpen] = useState(false);
  

  const openCloseCartModal = () => setIsCloseCartModalOpen(true);
  const closeCloseCartModal = () => setIsCloseCartModalOpen(false);

  useEffect(() => {
    if (closedOrder) {
      router.push("/cart/closedOrder");
    }
  }, [closedOrder, router]);

  const handleCloseOrder = async () => {
    try {
      setLoadingCloseOrder(true);
      await axios.post(`/api/orders/close-order`, { cartData: {deliveryOption: deliveryOption , comments : comments} });
      fetchCart();
      setClosedOrder(true);
      closeCloseCartModal()
      setLoadingCloseOrder(false);
    } catch (error) {
      console.log(error);
      closeCloseCartModal()
      setLoadingCloseOrder(false);
      handleError(error.response.data.message);
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
      <button
        className="confirm-order-close-order-button"
        onClick={openCloseCartModal}
      >
        Cerrar Pedido
      </button>
      <ConfirmModal
        isOpen={isCloseCartModalOpen}
        onClose={closeCloseCartModal}
        onConfirm={handleCloseOrder}
      > 
        ¿Esta seguro que desea cerrar el pedido?
      </ConfirmModal>
    </div>
  );
}

export default ConfirmOrderCloseOrder;
