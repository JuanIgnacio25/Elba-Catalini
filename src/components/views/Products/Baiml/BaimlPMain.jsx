"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import BaimlPCards from "@/components/views/Products/Baiml/BaimlPCards";
import BaimlPCategories from "@/components/views/Products/Baiml/BaimlPCategories";
import BaimlPMainFallback from "@/components/Fallbacks/BaimlPMainFallback";

import { useProduct } from "@/context/ProductContext";

function BaimlPMain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const { baimlProducts, loading, filterProducts } = useProduct();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const categories = searchParams.get("categories");
  const selectedCategories = categories ? categories.split(",") : [];

  useEffect(() => {
    const filtered =
      selectedCategories.length > 0
        ? filterProducts(selectedCategories)
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

  if (loading) return <BaimlPMainFallback />;

  return (
    <div className="baiml-p-standard-container">
      <div className="baiml-p-main-container">
        <BaimlPCategories
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
        />
        <BaimlPCards baimlProducts={filteredProducts} />
      </div>
    </div>
  );
}

export default BaimlPMain;
