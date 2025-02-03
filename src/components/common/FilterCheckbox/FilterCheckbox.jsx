import "@/components/common/FilterCheckbox/filterCheckbox.css"
import { FaCheck } from "react-icons/fa6";

function FilterCheckbox({ label , onCategoryChange , selectedCategories ,checked}) {

  const toggleCheckbox = () => {
    onCategoryChange(label,selectedCategories);
  };

  return (
    <div
      className="filter-checkbox-container"
      onClick={toggleCheckbox}
    >
      <div
        className={`filter-checkbox ${
          checked ? "checked" : ""
        }`}
      >
        {checked && (
          <span className="filter-checkbox-checkmark"><FaCheck className="text-xs md:text-sm lg:text-base"/></span>
        )}
      </div>
      <div className="filter-checkbox-label">
        <p>{label}</p>
      </div>
    </div>
  );
}

export default FilterCheckbox;