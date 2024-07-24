"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/orders");
      if (res.data && res.data.orders) {
        setOrders(res.data.orders);
      } else {
        console.error("Formato de respuesta no válido", res.data);
        setError("Formato de respuesta no válido");
      }
    } catch (error) {
      console.error("Error al obtener las ordenes", error);
      setError("Error al obtener las ordenes");
    } finally {
      setLoading(false);
    }
  };

  const handleRepeatOrder = async (id) => {
    try {
      const res = await axios.post(`/api/orders/repeat-order/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {orders.map((ord) => (
        <div key={ord.orderId}>
          <p>Numero de Orden{ord.orderId}</p>
          {ord.products.map((prod) => (
            <div key={prod.productId}>
              <p>{prod.name}</p>
              <p>{prod.category}</p>
              <p>{prod.description}</p>
              <p>{prod.unit}</p>
            </div>
          ))}
          <p>
            {new Date(ord.createdAt).toLocaleString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
          <button
            style={{ background: "white", color: "black" }}
            onClick={() => handleRepeatOrder(ord.orderId)}
          >
            Volver a pedir
          </button>
        </div>
      ))}
    </div>
  );
}

export default Orders;
