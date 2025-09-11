"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BAIML_CATEGORIES } from "@/constants/categories";

import BaimlProductCard from "@/components/common/BaimlProductCard/BaimlProductCard";
import ProductsCardsTest from "@/components/common/ProductsCards/ProductsCardsTest";
import ProductsFilterCategories from "@/components/common/ProductsFilterCategories/ProductsFilterCategories";

function BaimlPMain({
  products,
  currentPage,
  totalPages,
  totalProducts,
  searchParams,
  itemsPerPage,
  initialCategories,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const buildUrl = (pageNum, currentParams) => {
    const queryString = currentParams.toString();
    return queryString
      ? `/products/baiml/page/${pageNum}?${queryString}`
      : `/products/baiml/page/${pageNum}`;
  };

  const onCategoryChange = (category) => {
    const current = new URLSearchParams(params.toString());
    let categories = current.get("categories")?.split(",") || [];

    if (categories.includes(category)) {
      categories = categories.filter((c) => c !== category);
    } else {
      categories.push(category);
    }

    if (categories.length > 0) {
      current.set("categories", categories.join(","));
    } else {
      current.delete("categories");
    }

    // Resetear a la página 1 siempre
    router.push(buildUrl(1, current));
  };

  const deleteFilters = () => {
    const current = new URLSearchParams(params.toString());
    current.delete("categories");

    // Resetear a la página 1
    router.push(buildUrl(1, current));
  };

  return (
    <div className="baiml-p-standard-container">
      <div className="baiml-p-main-container">
        <ProductsFilterCategories
          categories={BAIML_CATEGORIES}
          selectedCategories={initialCategories}
          onCategoryChange={onCategoryChange}
          enabledButton={true}
          deleteFilters={deleteFilters}
        />

        <ProductsCardsTest
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={totalProducts}
          searchParams={searchParams}
          itemsPerPage={itemsPerPage}
          ProductCard={BaimlProductCard}
        />
      </div>
    </div>
  );
}

export default BaimlPMain;