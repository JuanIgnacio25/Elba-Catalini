"use client";

import { useRouter, useSearchParams } from "next/navigation";

import ProductCard from "@/components/common/ProductCard/ProductCard";
import ProductsCardsServerSide from "@/components/common/ProductsCards/ProductsCardsServerSide";
import ProductsFilterCategories from "@/components/common/ProductsFilterCategories/ProductsFilterCategories";

import { TOXIC_SHINE_CATEGORIES } from "@/constants/categories";

function ToxicShineMain(
  {products,
  currentPage,
  totalPages,
  totalProducts,
  searchParams,
  itemsPerPage,
  initialCategories}
) {
  
  const router = useRouter();
  const params = useSearchParams();

   const buildUrl = (pageNum, currentParams) => {
    const queryString = currentParams.toString();
    return queryString
      ? `/products/toxic-shine/page/${pageNum}?${queryString}`
      : `/products/toxic-shine/page/${pageNum}`;
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
    <div className="toxic-products-main-container">
      <div className="toxic-products-main">
        <ProductsFilterCategories
          categories={TOXIC_SHINE_CATEGORIES}
          selectedCategories={initialCategories}
          onCategoryChange={onCategoryChange}
          enabledButton={false}
          deleteFilters={deleteFilters}
        />

        <ProductsCardsServerSide
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={totalProducts}
          searchParams={searchParams}
          itemsPerPage={itemsPerPage}
          ProductCard={ProductCard}
        />
      </div>
    </div>
  );
}

export default ToxicShineMain;
