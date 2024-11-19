import Link from "next/link";

import { RxRows } from "react-icons/rx";

import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function BaimlPMainFallback() {
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
    <div className="baiml-p-standard-container">
      <div className="baiml-p-main-container">
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
            <div
              className="baiml-p-main-categories-checkbox-container"
              key={index}
            >
              <div className={`baiml-p-main-categories-checkbox`}></div>
              <div className="baiml-p-main-categories-checkbox-label">
                <p>{category}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="baiml-p-main-cards-fallback">
          <FallbackSpinner/>
        </div>
      </div>
    </div>
  );
}

export default BaimlPMainFallback;
