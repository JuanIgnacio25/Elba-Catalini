"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

function BaimlProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = async (id) => {
    try {
      await axios.post(`/api/carts/products/${id}`, {});
      
    } catch (error) {
      if (error.request.status == 401) {
        router.push(
          `/auth/login/?error=para añadir productos al carrito, primero debes iniciar sesion`
        );
      }
      console.log(error.response.data);
    }
  };

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
          <button
            style={{ background: "white", color: "black" }}
            onClick={() => handleAddToCart(prod.productId)}
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default BaimlProductsPage;
