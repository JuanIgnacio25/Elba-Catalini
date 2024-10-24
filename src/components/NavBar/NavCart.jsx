"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from "next/link";
import axios from "axios";
import { BsCart3 } from "react-icons/bs";

function NavCart() {
  const { data: session, status } = useSession();
  const [productCount, setProductCount] = useState(0);

  const fetchCart = async () => {
    try {
        const res = await axios.get(`/api/carts`);
        const cart = res.data.cart;

        if (cart.products && Array.isArray(cart.products) && cart.products.length > 0) {
          setProductCount(cart.products.length);
        } else {
          setProductCount(0);
        }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setProductCount(0);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchCart();
    }
  }, [status, session]);

  if (status !== "authenticated") {
    return (
      <Link href="/cart" className="nav-main-menu-cart-link">
        <BsCart3 className="nav-main-menu-icon-cart" />
      </Link>
    );
  }

  return (
    <Link href="/cart" className="nav-main-menu-cart-link">
      <BsCart3 className="nav-main-menu-icon-cart" />
      {productCount > 0 && (
        <span className="nav-main-menu-cart-counter">{productCount}</span>
      )}
    </Link>
  );
}

export default NavCart;