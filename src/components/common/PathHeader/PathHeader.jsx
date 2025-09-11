"use client"

import "./pathHeader.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

function PathHeader() {
  const path = usePathname();
  const pathArray = path.split("/").slice(1).map(decodeURIComponent);

  return (
    <div className={`path-header-container`}>
      <div className="path-header">
        {pathArray.map((namePath, index, arr) => {
          if (namePath === "store") return null;

          // Caso especial: cuando estamos en la raíz de productos
          if (namePath == "") {
            return (
              <div key={index} className="path-header-url">
                <Link href="/products">Productos</Link>
                <div>/</div>
                <Link href="/products/baiml">Baiml</Link>
              </div>
            );
          }

          // Detectar si es "page"
          if (namePath === "page") {
            const pageNum = arr[index + 1]; // el número viene después de "page"
            return (
              <div key={index} className="path-header-url">
                <span>Página {pageNum}</span>
              </div>
            );
          }

          // Evitar mostrar el número solo (porque ya lo usamos arriba)
          if (!isNaN(namePath) && arr[index - 1] === "page") {
            return null;
          }

          return (
            <div key={index} className="path-header-url">
              <Link href={`/${arr.slice(0, index + 1).join("/")}`}>
                {namePath === "products"
                  ? "Productos"
                  : namePath === "simplifiedView"
                  ? "Vista Simplificada"
                  : `${namePath[0].toUpperCase() + namePath.slice(1)}`}
              </Link>
              <div>/</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PathHeader;
