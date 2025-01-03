"use client";

import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdError } from "react-icons/md";

function ConfirmOrderDelivery({
  toggleSelectedCarrier,
  authState,
  onDeliverySelection,
  error,
  setError
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleSelection = (option) => {
    setError(null);
    const isDeselecting = selectedOption === option;
  
    setSelectedOption(isDeselecting ? null : option);
  
    if (option === "address") {
      toggleSelectedCarrier(!isDeselecting);
    } else if (option === "store") {
      toggleSelectedCarrier(false);
    }
  
    onDeliverySelection(isDeselecting ? null : option);
  };

  if (authState.status !== "authenticated") return <div>Loading...</div>;

  return (
    <div className="confirm-order-delivery-container">
      <h1 className="confirm-order-delivery-title">
        Elegí la forma de entrega
      </h1>

      <div className="confirm-order-delivery-address">
        <div
          className="confirm-order-delivery-address-select"
          onClick={() => toggleSelection("address")}
        >
          <div
            className={`confirm-order-delivery-address-select-checkbox ${
              selectedOption === "address" ? "checked" : ""
            }`}
          >
            {selectedOption === "address" && (
              <div className="confirm-order-delivery-address-select-checkmark">
                ✓
              </div>
            )}
          </div>
          <p className="confirm-order-delivery-address-select-text">
            {authState.session.user.address} , {authState.session.user.location}
          </p>
        </div>
        <div className="confirm-order-delivery-address-edit-container">
          <div className="confirm-order-delivery-address-edit">
            <p>Editar</p>
            <MdEdit />
          </div>
        </div>
      </div>

      <div className="confirm-order-delivery-store">
        <div
          className="confirm-order-delivery-store-select"
          onClick={() => toggleSelection("store")}
        >
          <div
            className={`confirm-order-delivery-store-select-checkbox ${
              selectedOption === "store" ? "checked" : ""
            }`}
          >
            {selectedOption === "store" && (
              <div className="confirm-order-delivery-store-select-checkmark">
                ✓
              </div>
            )}
          </div>
          <p className="confirm-order-delivery-store-select-text">
            Retiro personalmente por el local
          </p>
        </div>
      </div>
      {error && (
        <div className="flex items-center space-x-1">
          <MdError className="text-red-600 h-5 w-5" />
          <p className="text-red-600 text-sm font-semibold">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export default ConfirmOrderDelivery;
