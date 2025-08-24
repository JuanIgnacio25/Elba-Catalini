"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import ProductsCards from "@/components/common/ProductsCards/ProductsCards";
import ProductCard from "@/components/common/ProductCard/ProductCard";
import BaimlProductCard from "@/components/common/BaimlProductCard/BaimlProductCard";

function ProductsByCategoryMain() {
  const { kind, category } = useParams();
  const router = useRouter();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const res = await axios.get(`/api/products/kind/${kind}/${category}`);
        setFilteredProducts(res.data.filteredProducts);
      } catch (error) {
        router.push("/404");
      }
    };

    fetchFilteredProducts();
  }, [kind, category, router]);

  const decodedCategory = decodeURIComponent(category);

  return (
    <div className="products-by-category-products-cards">
      <h1 className="text-3xl text-red-500 font-bold mb-4 text-left capitalize">
        {decodedCategory}
      </h1>
      <ProductsCards
        products={filteredProducts}
        ITEMS_PER_PAGE={30}
        ProductCard={kind === "Baiml" ? BaimlProductCard : ProductCard}
      />
    </div>
  );
}

export default ProductsByCategoryMain
