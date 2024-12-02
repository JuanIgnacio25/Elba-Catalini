import '@/components/common/ConfirmModal/confirmModal.css'

import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const  ConfirmModal = ({ isOpen, onClose, onConfirm, children }) => {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}><IoCloseSharp/></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="modal-button modal-button-accept" onClick={onConfirm}>Aceptar <FaCheck/></button>
          <button className="modal-button modal-button-cancel" onClick={onClose}>Cancelar <IoCloseSharp/></button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal