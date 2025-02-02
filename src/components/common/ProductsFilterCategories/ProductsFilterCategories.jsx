"use client";

import "@/components/common/ProductsFilterCategories/productsFilterCategories.css";

import Link from "next/link";

import FilterCheckbox from "@/components/common/FilterCheckbox/FilterCheckbox";
import { RxRows } from "react-icons/rx";
import { RiCloseFill } from "react-icons/ri";

function ProductsFilterCategories({
  categories,
  onCategoryChange,
  selectedCategories,
  enabledButton,
  deleteFilters,
}) {
  return (
    <div className="products-categories">
      <div className="flex flex-col  items-start mb-2 ">
        <h3 className="flex items-center text-gray-800 text-base sm:text-xl lg:text-2xl font-bold">
          Categorias
        </h3>
        {selectedCategories.length > 0 && (
          <button
            className="flex items-center text-xs sm:text-sm text-red-500 font-semibold hover:text-red-700"
            onClick={deleteFilters}
          >
            <RiCloseFill className="text-sm sm:text-base lg:text-lg" />
            Borrar filtros
          </button>
        )}
      </div>
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
