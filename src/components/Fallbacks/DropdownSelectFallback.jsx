import { FaCircleUser } from "react-icons/fa6";

const DropdownSelectFallback = () => {
  return (
   
    <button
          className="nav-main-login-button"
        >
          <FaCircleUser className="nav-main-menu-icon-user" />
          <span className="nav-main-menu-fallback-text">Ingresá</span>
        </button>
  )
};

export default DropdownSelectFallback;
