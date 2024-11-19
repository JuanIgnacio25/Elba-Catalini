"use client";

import Link from "next/link";

import { RxRows } from "react-icons/rx";

function CustomCheckbox({ label , onCategoryChange , selectedCategories ,checked}) {

  const toggleCheckbox = () => {
    onCategoryChange(label,selectedCategories);
  };

  return (
    <div
      className="baiml-p-main-categories-checkbox-container"
      onClick={toggleCheckbox}
    >
      <div
        className={`baiml-p-main-categories-checkbox ${
          checked ? "checked" : ""
        }`}
      >
        {checked && (
          <span className="baiml-p-main-categories-checkmark">✓</span>
        )}
      </div>
      <div className="baiml-p-main-categories-checkbox-label">
        <p>{label}</p>
      </div>
    </div>
  );
}

function BaimlPCategories({ onCategoryChange, selectedCategories }) {
  const categories = [
    "Faros de posición",
    "Posición electrónicos",
    "Faros plafonier",
    "Giro delantero",
    "Plafonier electrónicos",
    "Faros ilumina patente",
    "Ilumina patente electrónicos",
    "Faros de stop / Antiniebla",
    "Faros traseros",
    "Traseros electrónicos",
    "Faros flexibles electrónicos",
    "Soportes",
    "Soportes electrónicos",
    "Faros de advertencia",
    "Reflectores",
    "Reflectores de alta potencia",
    "Lentes de repuestos",
    "Accesorios",
    "Repuestos",
  ];

  return (
    <div className="baiml-p-main-categories">
      <h3 className="baiml-p-main-categories-title">Categorias</h3>
      <div className="baiml-p-main-categories-simplified-view-button-container">
        <Link href={"/products/baiml/simplifiedView"}>
          <button className="baiml-p-main-categories-simplified-view-button">
            {" "}
            <RxRows />
            Vista simplificada
          </button>
        </Link>
      </div>
      {categories.map((category, index) => (
        <CustomCheckbox
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

export default BaimlPCategories;
