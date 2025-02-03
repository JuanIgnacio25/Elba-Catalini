"use client";

import { useState, useEffect, } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import ProductsCards from "@/components/common/ProductsCards/ProductsCards"
import ProductCard from "@/components/common/ProductCard/ProductCard";
import ProductsFilterCategories from "@/components/common/ProductsFilterCategories/ProductsFilterCategories";
import ProductsMainFallback from "@/components/Fallbacks/ProductsMainFallback/ProductsMainFallback"

import { TOXIC_SHINE_CATEGORIES } from "@/constants/categories";

import { useProduct } from "@/context/ProductContext";

function ToxicShineMain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const { toxicShineProducts, loading, filterToxicShineProducts } =
    useProduct();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const categories = searchParams.get("categories");
  const selectedCategories = categories ? categories.split(",") : [];

  useEffect(() => {
    const filtered =
      selectedCategories.length > 0
        ? filterToxicShineProducts(selectedCategories)
        : toxicShineProducts;

    if (JSON.stringify(filtered) !== JSON.stringify(filteredProducts)) {
      setFilteredProducts(filtered);
    }

  }, [toxicShineProducts, selectedCategories, filterToxicShineProducts]);

  const onCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    const newParams = new URLSearchParams(searchParams);
    if (updatedCategories.length > 0) {
      newParams.set("categories", updatedCategories.join(","));
    } else {
      newParams.delete("categories");
    }

    const newUrl = `${pathName}?${newParams.toString()}`;
    router.push(newUrl);
  };

  const deleteFilters = () => {
    const newUrl = pathName;
    router.push(newUrl);
  }

  if (loading) return <ProductsMainFallback categories={TOXIC_SHINE_CATEGORIES} enabled={false}/>;

  return (
    <div className="toxic-products-main-container">
      <div className="toxic-products-main">
        <ProductsFilterCategories
          categories={TOXIC_SHINE_CATEGORIES}
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
          enabledButton={false}
          deleteFilters={deleteFilters}
        />
        <ProductsCards products={filteredProducts} ProductCard={ProductCard} ITEMS_PER_PAGE={12} enabledResetAnimation={true}/>
      </div>
    </div>
  );
}

export default ToxicShineMain;
