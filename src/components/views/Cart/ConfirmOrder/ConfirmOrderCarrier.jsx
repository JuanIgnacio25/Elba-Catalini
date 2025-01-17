import { useState , useEffect } from "react";

import axios from "axios";

import { MdEdit } from "react-icons/md";
import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { set } from "mongoose";

function ConfirmOrderCarrier({ selectedCarrier, authState , refreshToken}) {
  const [checked, setChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [carrier, setCarrier] = useState(null);
  const [prevCarrier, setPrevCarrier] = useState(null);
  const [error , setError] = useState(null);


  useEffect(() => {
    if (authState.status === "authenticated" && authState.session?.user) {
      setCarrier(authState.session.user.carrier || "");
    }
  }, [authState]);

  const handleEdit = () => {
    setPrevCarrier(carrier);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post("/api/user/carrier", {carrier:carrier});
      setError(null);
      await refreshToken();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      setError("El nombre del transporte es requerido");
      setCarrier(prevCarrier);
    } finally {
      setIsSaving(false);
    }
  };

  if (authState.status !== "authenticated" || !selectedCarrier) return null;

  return (
    <div className={"confirm-order-carrier-container"}>
      <h2 className="confirm-order-carrier-title">Transporte</h2>
      <div className="confirm-order-carrier">
        <div
          className="confirm-order-carrier-select"
          onClick={() => setChecked(!checked)}
        >
          <div className={"confirm-order-carrier-select-checkbox"}>
            <div className="confirm-order-carrier-select-checkmark">✓</div>
          </div>
          {!isEditing ? (
            <p className="confirm-order-carrier-select-text">
              {authState.session.user.carrier}
            </p>
          ) : (
            <input
              type="text"
              name="carrier"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              placeholder="Transporte de Preferencia"
              className="w-10/12 md:w-11/12 lg:w-9/12 outline outline-1 outline-black focus:outline-2 focus:outline-red-500 focus:border-0 rounded px-1"
            />
          )}
        </div>
        <div className="confirm-order-carrier-edit-container">
        {!isEditing ? (
            <div
              className="confirm-order-carrier-edit"
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
                  setCarrier(prevCarrier);
                  setIsEditing(false);
                }}
              >
                <IoIosCloseCircle />
              </button>
            </div>
          )}
        </div>
      </div>
      {error && (
        <div className="flex items-center space-x-1 py-1">
          <MdError className="text-red-600 h-5 w-5" />
          <p className="text-red-600 text-sm font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
}

export default ConfirmOrderCarrier;
