"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import ConfirmOrderDetail from "@/components/views/Cart/ConfirmOrder/ConfirmOrderDetail";
import ConfirmOrderDelivery from "@/components/views/Cart/ConfirmOrder/ConfirmOrderDelivery";
import ConfirmOrderCarrier from "@/components/views/Cart/ConfirmOrder/ConfirmOrderCarrier";
import ConfirmOrderComments from "@/components/views/Cart/ConfirmOrder/ConfirmOrderComments";
import ConfirmOrderCloseOrder from "@/components/views/Cart/ConfirmOrder/ConfirmOrderCloseOrder";

function ConfirmOrderMain() {
  const router = useRouter();
  const { cart, loading, fetchCart } = useCart();
  const { authState, refreshToken } = useAuth();

  const [selectedCarrier, setSelectedCarrier] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [comments, setComments] = useState("");
  const [error, setError] = useState(null);
  const [closedOrder, setClosedOrder] = useState(false); // Nuevo estado

  const handleError = (error) => {
    setError(error);
  };

  const handleDeliverySelection = (option) => {
    setDeliveryOption(option);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const toggleSelectedCarrier = (value) => {
    setSelectedCarrier(value);
  };

  useEffect(() => {
    if (closedOrder) {
      fetchCart();
    } else if (!loading && cart && cart.products.length === 0) {
      router.push("/cart");
    }
  }, [cart, loading, router, closedOrder]);

  return (
    <div className="confirm-order">
      <div className="confirm-order-selectable-actions">
        <ConfirmOrderDelivery
          toggleSelectedCarrier={toggleSelectedCarrier}
          authState={authState}
          onDeliverySelection={handleDeliverySelection}
          error={error}
          setError={setError}
          refreshToken={refreshToken}
        />
        <ConfirmOrderCarrier
          selectedCarrier={selectedCarrier}
          authState={authState}
          refreshToken={refreshToken}
        />
        <ConfirmOrderComments
          handleCommentsChange={handleCommentsChange}
          comments={comments}
        />
        <ConfirmOrderCloseOrder
          fetchCart={fetchCart}
          deliveryOption={deliveryOption}
          handleError={handleError}
          comments={comments}
          setClosedOrder={setClosedOrder} // Pasamos el setter
        />
      </div>
      <ConfirmOrderDetail cart={cart} loading={loading} />
    </div>
  );
}

export default ConfirmOrderMain;
