import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (status === "authenticated") {
      try {
        const res = await axios.get("/api/carts");
        setCart(res.data.cart);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
        setCart(null);
      } finally {
        setLoading(false);
      }
    } else if (status === "unauthenticated") {
      setLoading(false);
      setCart({ products: [] });
    }
  };

  const addProductToCart = async (id, quantity) => {
    if (status === "authenticated") {
      try {
        await axios.post(`/api/carts/products/${id}`, { quantity });
        await fetchCart();
      } catch (error) {
        console.error("Error al añadir el producto al carrito:", error.response?.data);
      }
    } else {
      router.push(
        `/auth/login?error=para añadir productos al carrito, primero debes iniciar sesión`
      );
    }
  };

  const deleteProductFromCart = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/carts/products/${id}`);
      await fetchCart();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const clearTheCart = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/carts/products");
      await fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const updatedProducts = cart.products.map((product) =>
        product.productId === productId
          ? { ...product, quantity: newQuantity }
          : product
      );
      setCart({ ...cart, products: updatedProducts });
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto:", error);
    }
  };

  useEffect(() => {
    if (status !== "loading") {
      fetchCart();
    }
  }, [status]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        isAuthenticated: status === "authenticated",
        addProductToCart,
        deleteProductFromCart,
        clearTheCart,
        updateQuantity,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}