import "@/components/common/FilterCheckbox/filterCheckbox.css"

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
          <span className="filter-checkbox-checkmark">✓</span>
        )}
      </div>
      <div className="filter-checkbox-label">
        <p>{label}</p>
      </div>
    </div>
  );
}

export default FilterCheckbox;