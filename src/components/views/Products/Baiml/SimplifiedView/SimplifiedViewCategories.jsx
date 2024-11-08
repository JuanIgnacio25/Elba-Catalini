"use client";

import { useState } from "react";

function SimplifiedViewCategories() {
  const categories = [
    "Todo",
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

  const [selected, setSelected] = useState("Todo");

  return (
    <div className="simplified-view-categories">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`simplified-view-categories-category-button ${
            selected === category ? "selected" : ""
          }`}
          onClick={() => setSelected(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default SimplifiedViewCategories;
