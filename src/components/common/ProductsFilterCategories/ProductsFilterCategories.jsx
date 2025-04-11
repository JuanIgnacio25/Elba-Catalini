"use client";

import "@/components/common/ProductsFilterCategories/productsFilterCategories.css";

import Link from "next/link";
import { useState } from "react";

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
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
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
      <div className="products-categories-responsive-buttons">
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
        <button
          className="px-3 py-1 rounded-md text-white font-semibold bg-red-600"
          onClick={() => setShowOverlay(true)}
        >
          Filtros
        </button>
      </div>
      {showOverlay && (
        <div className="categories-overlay fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-3 border-b relative">
            <h3 className="text-lg font-bold text-gray-800">Categorías</h3>
            <button
              onClick={() => setShowOverlay(false)}
              className="text-2xl text-red-600"
            >
              <RiCloseFill />
            </button>
          </div>

          <div className="px-4 pt-4 pb-16">
            {selectedCategories.length > 0 && (
              <button
                className="flex items-center text-sm text-red-500 font-semibold hover:text-red-700 mb-2"
                onClick={deleteFilters}
              >
                <RiCloseFill className="mr-1" />
                Borrar filtros
              </button>
            )}
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

          <div className="flex items-center justify-center fixed bottom-0 left-1/2 -translate-x-1/2 w-full py-2 shadow-[0_-2px_6px_rgba(0,0,0,0.1)] bg-white">
            <button
              className="w-3/5 px-2 py-1.5 rounded-md text-white font-semibold bg-red-600 z-50"
              onClick={() => setShowOverlay(false)}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsFilterCategories;
