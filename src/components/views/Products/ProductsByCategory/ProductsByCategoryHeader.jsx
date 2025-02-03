"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

function ProductsByCategoryHeader() {
  const { kind, category } = useParams();

  const decodedCategory = decodeURIComponent(category);

  return (
    <div className="flex justify-center w-full my-5">
      <div className="products-by-category-header flex flex-row flex-wrap items-start justify-start gap-1 text-sm text-red-500 font-semibold">
        {kind === "Baiml" && (
          <>
            <div className="flex flex-row justify-center gap-1">
              <Link href={"/products"}>Productos</Link>
              <div>/</div>
            </div>
            <div className="flex flex-row justify-center gap-1">
              <Link href={"/products/baiml"}>Baiml</Link>
              <div>/</div>
            </div>
            <div className="flex flex-row justify-center gap-1 break-words">
              <div>{decodedCategory}</div>
            </div>
          </>
        )}

        {kind === "Store" && (
          <>
            <div className="flex flex-row justify-center gap-1">
              <Link href={"/products"}>Productos</Link>
              <div>/</div>
            </div>
            <div className="flex flex-row justify-center gap-1">
              <Link href={"/products/toxic-shine"}>Toxic Shine</Link>
              <div>/</div>
            </div>
            <div className="flex flex-row justify-center gap-1 break-words">
              <div>{decodedCategory}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductsByCategoryHeader;
