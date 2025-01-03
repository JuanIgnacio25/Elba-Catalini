import { useState } from "react";
import { MdEdit } from "react-icons/md";

function ConfirmOrderCarrier({selectedCarrier , authState}) {
  const [checked, setChecked] = useState(false);

  if(authState.status !== "authenticated" || !selectedCarrier) return null

  return (
    <div className={"confirm-order-carrier-container"}>
      <h2 className="confirm-order-carrier-title">Transporte</h2>
      <div className="confirm-order-carrier">
        <div
          className="confirm-order-carrier-select"
          onClick={() => setChecked(!checked)}
        >
          <div
            className={"confirm-order-carrier-select-checkbox"} 
          >
              <div className="confirm-order-carrier-select-checkmark">✓</div>
          </div>
          <p className="confirm-order-carrier-select-text">
            {authState.session.user.carrier}
          </p>
        </div>
        <div className="confirm-order-carrier-edit-container">
          <div className="confirm-order-carrier-edit">
            <p>Editar</p>
            <MdEdit />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrderCarrier;
