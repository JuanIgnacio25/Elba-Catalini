"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('/api/carts');
        if (res.data && res.data.cart) {
          setCart(res.data.cart);
        } else {
          console.error("Invalid response format", res.data);
          setError("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching cart", error);
        setError("Error fetching cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/carts/products/${id}`);
      const updatedCart = await axios.get('/api/carts');
      setCart(updatedCart.data.cart);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      router.refresh();
    }
  };

  const handleCloseOrder = async () => {
    try {
      const res = await axios.post(`/api/orders/close-order`);
      console.log(res);
    } catch (error) {
      console.error('Error closing order:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cart || cart.products.length === 0) {
    return <p>El carrito está vacío</p>;
  }

  return (
    <div>
      {cart.products.map((e) => (
        <div key={e.productId}>
          <p>{e.name}</p>
          <p>{e.category}</p>
          <p>{e.description}</p>
          <p>{e.unit}</p>
          <button style={{ background: "white", color: "black" }} onClick={() => handleDelete(e.productId)}>
            Delete
          </button>
        </div>
      ))}
      <button style={{ background: "white", color: "black" }} onClick={handleCloseOrder}>
        Cerrar pedido
      </button>
    </div>
  );
}

export default Cart;
