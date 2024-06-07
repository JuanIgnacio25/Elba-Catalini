"use client";

import { useEffect, useState } from "react";
import axios from "axios";

function BaimlProductsPage() {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {products.map((prod) => (
        <div key={prod.productId}>
          <h4>{prod.name}</h4>
          <p>{prod.description}</p>
          <p>{prod.category}</p>
          <p>{prod.unit}</p>
        </div>
      ))}
    </div>
  );
}

export default BaimlProductsPage;
