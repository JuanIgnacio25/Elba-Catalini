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
  const { authState , refreshToken } = useAuth();

  const [selectedCarrier, setSelectedCarrier] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [comments, setComments] = useState("");
  const [error, setError] = useState(null);

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
    if (!loading && cart && cart.products) {
      if (cart.products.length === 0) {
        router.push("/cart");
      }
    }
  }, [cart, loading, router]);

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
        />
      </div>
      <ConfirmOrderDetail cart={cart} loading={loading} />
    </div>
  );
}

export default ConfirmOrderMain;
