"use client";

import Link from "next/link";
import { useState } from "react";

import { RxRows } from "react-icons/rx";

function CustomCheckbox({ label }) {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <div className="baiml-p-main-categories-checkbox-container" onClick={toggleCheckbox}>
      <div className={`baiml-p-main-categories-checkbox ${checked ? "checked" : ""}`}>
        {checked && <span className="baiml-p-main-categories-checkmark">✓</span>}
      </div>
      <div className="baiml-p-main-categories-checkbox-label">
        <p>{label}</p>
      </div>
    </div>
  );
}

function BaimlPCategories() {
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
      <div className="baiml-p-main-categories-button-container">
        <Link href={"/products/baiml/simplifiedView"}>
          <button className="baiml-p-main-categories-button"> <RxRows/>Vista simplificada</button>
        </Link>
      </div>
      {categories.map((category, index) => (
        <CustomCheckbox key={index} label={category} />
      ))}
    </div>
  );
}

export default BaimlPCategories;
