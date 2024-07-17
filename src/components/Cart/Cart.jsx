"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";


function Cart({ cart }) {
  const router = useRouter()

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/carts/products/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  }

  const handleCloseOrder = async () => {
    try {
      const res = await axios.post(`/api/orders/close-order`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {cart.products.length == 0 ? (<p>El carrito esta vacio</p>) : (
        cart.products.map((e) => {
          return (
            <div key={e.productId}>
              <p>{e.name}</p>
              <p>{e.category}</p>
              <p>{e.description}</p>
              <p>{e.unit}</p>
              <button style={{background:"white",color:"black"}} onClick={() => handleDelete(e.productId)}>Delete</button>
            </div>
          );
        })
      )}
      <button style={{background:"white",color:"black"}} onClick={() => handleCloseOrder()}>Cerrar pedido</button>
    </div>
  );
}

export default Cart;
