import '@/components/common/ConfirmModal/confirmModal.css'

import { IoCloseSharp } from "react-icons/io5";

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
          <button className="modal-button" onClick={onConfirm}>Aceptar</button>
          <button className="modal-button" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal