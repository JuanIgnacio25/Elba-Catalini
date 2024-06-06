"use client";

import { useEffect, useState } from "react";
import axios from "axios";

function BaimlProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
      console.log(res.data.products);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((prod) => {
        return (
          <div key={prod.productId}>
            <h4>{prod.name}</h4>
            <p>{prod.description}</p>
            <p>{prod.category}</p>
            <p>{prod.unit}</p>
          </div>
        );
      })}
    </div>
  );
}

export default BaimlProductsPage;
