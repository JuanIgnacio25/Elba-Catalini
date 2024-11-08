"use client";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";

function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        <ProductProvider>{children}</ProductProvider>
      </CartProvider>
    </SessionProvider>
  );
}

export default Providers;
