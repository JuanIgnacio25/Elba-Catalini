"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { BAIML_CATEGORIES } from "@/constants/categories";

import ProductsCards from "@/components/common/ProductsCards/ProductsCards";
import BaimlProductCard from "@/components/common/BaimlProductCard/BaimlProductCard"
import ProductsFilterCategories from "@/components/common/ProductsFilterCategories/ProductsFilterCategories";
import ProductsMainFallback from "@/components/Fallbacks/ProductsMainFallback/ProductsMainFallback";

import { useProduct } from "@/context/ProductContext";

function BaimlPMain() { 

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const { baimlProducts, loading, filterBaimlProducts } = useProduct();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const categories = searchParams.get("categories");
  const selectedCategories = categories ? categories.split(",") : [];

  useEffect(() => {
    const filtered =
      selectedCategories.length > 0
        ? filterBaimlProducts(selectedCategories)
        : baimlProducts;

    if (JSON.stringify(filtered) !== JSON.stringify(filteredProducts)) {
      setFilteredProducts(filtered);
    }

  }, [baimlProducts, selectedCategories]);

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

    const newUrl = `${pathName}?${newParams.toString().replace(/%2C/g, ",")}`;
    router.push(newUrl);
  };

  const deleteFilters = () => {
    const newUrl = pathName;
    router.push(newUrl);
  }

  if (loading) return <ProductsMainFallback categories={BAIML_CATEGORIES} enabled={true}/>;

  return (
    <div className="baiml-p-standard-container">
      <div className="baiml-p-main-container">
        <ProductsFilterCategories
          categories={BAIML_CATEGORIES}
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
          enabledButton={true}
          deleteFilters={deleteFilters}
        />
        <ProductsCards products={filteredProducts} enabledResetAnimation={true} ITEMS_PER_PAGE={12} ProductCard={BaimlProductCard}/>
      </div>
    </div>
  );
}

export default BaimlPMain;
