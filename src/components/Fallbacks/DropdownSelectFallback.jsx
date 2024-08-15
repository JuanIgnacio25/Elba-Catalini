import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const DropdownSelectFallback = () => {
  return (
   
    <div className="nav-main-menu-select-fallback">
      <div className="nav-main-menu-select-fallback-placeholder">
        <FaRegUser/>
        <span>Cuenta</span>
      </div>
      <IoIosArrowDown/>
    </div>
  )
};

export default DropdownSelectFallback;
