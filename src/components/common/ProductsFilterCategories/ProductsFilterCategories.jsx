"use client";

import "@/components/common/ProductsFilterCategories/productsFilterCategories.css";

import Link from "next/link";

import FilterCheckbox from "@/components/common/FilterCheckbox/FilterCheckbox";
import { RxRows } from "react-icons/rx";

function ProductsFilterCategories({
  categories,
  onCategoryChange,
  selectedCategories,
  enabledButton,
}) {
  return (
    <div className="products-categories">
      <h3 className="products-categories-title">Categorias</h3>
      <div
        className={`${
          enabledButton
            ? "products-categories-simplified-view-button-container "
            : "product-categories-simplified-view-button-disabled"
        }`}
      >
        <Link href={"/products/baiml/simplifiedView"}>
          <button className="products-categories-simplified-view-button">
            {" "}
            <RxRows />
            Vista simplificada
          </button>
        </Link>
      </div>
      {categories.map((category, index) => (
        <FilterCheckbox
          key={index}
          label={category}
          selectedCategories={selectedCategories}
          checked={selectedCategories.includes(category)}
          onCategoryChange={onCategoryChange}
        />
      ))}
    </div>
  );
}

export default ProductsFilterCategories;
