"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Importa useRouter
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
        console.error(error);
        router.push("/404");
      }
    };

    fetchFilteredProducts();
  }, [kind, category, router]);

  return (
    <div className="products-by-category-products-cards">
      <ProductsCards
        products={filteredProducts}
        ITEMS_PER_PAGE={15}
        ProductCard={kind === "Baiml" ? BaimlProductCard : ProductCard}
      />
    </div>
  );
}

export default ProductsByCategoryMain
