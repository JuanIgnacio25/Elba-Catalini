import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    if (status === "authenticated") {
      try {
        setLoading(true);
        const res = await axios.get("/api/carts");
        setCart(res.data.cart);
      } catch (error) {
        setCart(null);
      } finally {
        setLoading(false);
      }
    } else if (status === "unauthenticated") {
      setLoading(true);

      try {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        const mappedCart = {
          products: localCart,
        };

        setCart(mappedCart);
      } catch (error) {
        setCart({ products: [] });
      } finally {
        setLoading(false);
      }
    }
  }, [status]);

  const addProductToCart = async (id, quantity) => {
    if (status === "authenticated") {
      try {
        const res = await axios.post(`/api/carts/products/${id}`, { quantity });
        await fetchCart();
        return res;
      } catch (error) {
        throw error;
      }
    } else if(status === "unauthenticated") {
      try {
        const intQuantity = Number(quantity);
        const storedCart = localStorage.getItem("cart");
        const localCart = storedCart ? JSON.parse(storedCart) : [];

        const existingProduct = localCart.find((item) => {
          return item.productId === id;
        });

        if (existingProduct) {
          existingProduct.quantity += intQuantity;

          await new Promise(resolve => setTimeout(resolve, 1000));

          localStorage.setItem("cart", JSON.stringify(localCart));
          await fetchCart();

          return {
            data: { name: existingProduct.name, quantity: intQuantity },
          };
        } else {
          const res = await axios.get(`/api/products/${id}`);

          localCart.push({ ...res.data, quantity: intQuantity });

          localStorage.setItem("cart", JSON.stringify(localCart));
          await fetchCart();

          return { data: { name: res.data.name, quantity: intQuantity } };
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const deleteProductFromCart = async (id) => {
    if (status === "authenticated") {
      try {
        setLoading(true);
        await axios.delete(`/api/carts/products/${id}`);
        await fetchCart();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    } else if (status === "unauthenticated") {
      try {
        setLoading(true);
        const storedCart = localStorage.getItem("cart");
        const localCart = storedCart ? JSON.parse(storedCart) : [];

        const updatedCart = localCart.filter((item) => item.productId !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        await fetchCart();

      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearTheCart = async () => {
    if (status === "authenticated") {
      try {
        setLoading(true);
        await axios.delete("/api/carts/products");
        await fetchCart();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else if (status === "unauthenticated"){
      try {
        setLoading(true);

        localStorage.setItem("cart", JSON.stringify([]));
        await fetchCart();
      } catch (error) {
        console.log(error);
      }
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
  }, [fetchCart, status]);

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
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
