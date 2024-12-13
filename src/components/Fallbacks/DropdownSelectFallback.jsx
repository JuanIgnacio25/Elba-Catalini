import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

const DropdownSelectFallback = () => {
  return (
   
    <button
          className="nav-main-login-button"
        >
          <FaCircleUser className="nav-main-menu-icon-user" />
          <span>Ingresá</span>
        </button>
  )
};

export default DropdownSelectFallback;
