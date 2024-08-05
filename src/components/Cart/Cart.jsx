"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/carts');
      if (res.data && res.data.cart) {
        setCart(res.data.cart);
      } else {
        console.error("Formato de respuesta no válido", res.data);
        setError("Formato de respuesta no válido");
      }
    } catch (error) {
      console.error("Error al obtener el carrito", error);
      setError("Error al obtener el carrito");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/carts/products/${id}`);
      fetchCart();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleCloseOrder = async () => {
    try {
      const res = await axios.post(`/api/orders/close-order`);
      fetchCart();
    } catch (error) {
      console.error('Error al cerrar el pedido:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
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
            Eliminar
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
