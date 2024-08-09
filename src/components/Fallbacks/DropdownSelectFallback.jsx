import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const DropdownSelectFallback = () => {
  return (
    <div className="nav-main-menu-fallback-select-container">
      <div className="nav-main-menu-fallback-select">
        <div className="nav-main-menu-fallback-placeholder">
          <FaRegUser className="nav-main-menu-fallback-icon-user" />
          <span>Cuenta</span>
        </div>
        <IoIosArrowDown className="nav-main-menu-fallback-select-arrow" />
      </div>
    </div>
  );
};

export default DropdownSelectFallback;
