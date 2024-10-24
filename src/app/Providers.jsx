"use client";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";

function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}

export default Providers;
