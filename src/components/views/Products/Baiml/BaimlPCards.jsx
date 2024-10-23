"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import BaimlProductCard from "@/components/common/BaimlProductCard/BaimlProductCard";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function BaimlPCards() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Invalid response format", res.data);
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching products", err);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="baiml-p-main-cards-fallback">
        <FallbackSpinner/>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="baiml-p-main-cards-container">
      {products.map((prod) => {
        return <BaimlProductCard prod={prod} key={prod.productId} />;
      })}
    </div>
  );
}

export default BaimlPCards;
