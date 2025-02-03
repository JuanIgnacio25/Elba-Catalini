"use client";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";

function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>{children}</ProductProvider>
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default Providers;
