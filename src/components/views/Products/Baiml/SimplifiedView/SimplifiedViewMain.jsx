"use client"

import { useEffect, useState } from "react";
import { useProduct } from "@/context/ProductContext";

import SimplifiedViewCards from "@/components/views/Products/Baiml/SimplifiedView/SimplifiedViewCards";
import SimplifiedViewCategories from "@/components/views/Products/Baiml/SimplifiedView/SimplifiedViewCategories";
import SimplifiedViewMainFallback from "@/components/Fallbacks/SimplifiedViewMainFallback";

function SimplifiedViewMain() {
  const { baimlProducts, loading, filterBaimlProducts } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category , setCategory] = useState([]);

  useEffect(() => {
    setFilteredProducts(filterBaimlProducts(category));
  }, [baimlProducts , loading , category, filterBaimlProducts]);

  const handleCategoryChange = (category) => {
    setCategory([category]);
  }

  if (loading) {
    return <SimplifiedViewMainFallback/>;
  }

  return (
    <div className="simplified-view">
      <SimplifiedViewCategories handleCategoryChange={handleCategoryChange}/>
      <SimplifiedViewCards baimlProducts={filteredProducts}/>
    </div>
  );
}

export default SimplifiedViewMain;
