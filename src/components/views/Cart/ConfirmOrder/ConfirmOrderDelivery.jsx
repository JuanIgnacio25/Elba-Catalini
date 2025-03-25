"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { MdEdit } from "react-icons/md";
import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

function ConfirmOrderDelivery({
  toggleSelectedCarrier,
  authState,
  onDeliverySelection,
  error,
  setError,
  refreshToken
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userInfo, setUserInfo] = useState({ address: "", location: "" });
  const [prevUserInfo, setPrevUserInfo] = useState(null);

  useEffect(() => {
    if (authState.status === "authenticated" && authState.session?.user) {
      setUserInfo({
        address: authState.session.user.address || "",
        location: authState.session.user.location || "",
      });
    }
  }, [authState]);

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

  const handleEdit = () => {
    setPrevUserInfo(userInfo);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post("/api/user/shippingInfo", userInfo);
      setError(null);
      await refreshToken();
      setIsEditing(false);
    } catch (error) {
      setError(error.response.data.message);
      setUserInfo(prevUserInfo);
    } finally {
      setIsSaving(false);
    }
  };

  if (authState.status !== "authenticated" || authState.status === "loading") {
    return (
      <div className="confirm-order-delivery-container">
        <h1 className="confirm-order-delivery-title">
          Elegí la forma de entrega
        </h1>
        <div className="confirm-order-delivery-address">
          <div className="confirm-order-delivery-address-select">
            <div className="confirm-order-delivery-address-select-checkbox"></div>
            <p className="confirm-order-delivery-address-select-text"></p>
          </div>
          <div className="confirm-order-delivery-address-edit-container">
            <div className="confirm-order-delivery-address-edit">
              <p>Editar</p>
              <MdEdit />
            </div>
          </div>
        </div>
        <div className="confirm-order-delivery-store">
          <div className="confirm-order-delivery-store-select">
            <div className="confirm-order-delivery-store-select-checkbox"></div>
            <p className="confirm-order-delivery-store-select-text">
              Retiro personalmente por el local
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm-order-delivery-container">
      <h1 className="confirm-order-delivery-title">
        Elegí la forma de entrega
      </h1>

      <div className="confirm-order-delivery-address">
        <div
          className={`confirm-order-delivery-address-select ${
            isEditing ? "disabled" : ""
          }`}
          onClick={!isEditing ? () => toggleSelection("address") : undefined}
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
          {!isEditing ? (
            <p className="confirm-order-delivery-address-select-text">
              {userInfo.address}, {userInfo.location}
            </p>
          ) : (
            <div className="flex gap-1 w-10/12 md:w-11/12 lg:w-9/12">
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                placeholder="Domicilio"
                className="w-1/2 outline outline-1 outline-black focus:outline-2 focus:outline-red-500 focus:border-0 rounded px-1"
              />
              <input
                type="text"
                name="location"
                value={userInfo.location}
                onChange={handleInputChange}
                placeholder="Ciudad, Provincia"
                className="w-1/2 outline outline-1 outline-black focus:outline-2 focus:outline-red-500 focus:border-0 rounded px-1"
              />
            </div>
          )}
        </div>
        <div className="confirm-order-delivery-address-edit-container">
          {!isEditing ? (
            <div
              className="confirm-order-delivery-address-edit"
              onClick={handleEdit}
            >
              <p>Editar</p>
              <MdEdit />
            </div>
          ) : isSaving ? (
            <div className="w-full flex justify-center items-center">
              <div className="confirm-order-delivery-address-fallback-spinner"></div>
            </div>
          ) : (
            <div className="flex gap-1">
              <button
                className="text-lg md:text-xl lg:text-2xl text-green-500"
                onClick={handleSave}
              >
                <IoIosCheckmarkCircle />
              </button>
              <button
                className="text-lg md:text-xl lg:text-2xl text-red-500"
                onClick={() => {
                  setUserInfo(prevUserInfo);
                  setIsEditing(false);
                  setError(null);
                }}
              >
                <IoIosCloseCircle />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="confirm-order-delivery-store">
        <div
          className={`confirm-order-delivery-store-select ${
            isEditing ? "disabled" : ""
          }`}
          onClick={!isEditing ? () => toggleSelection("store") : undefined}
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
          <MdError className="text-red-600 h-3 md:h-4 lg:h-5 w-3 md:w-4 lg:w-5 " />
          <p className="text-red-600 text-xs md:text-sm lg:text-base font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
}

export default ConfirmOrderDelivery;
