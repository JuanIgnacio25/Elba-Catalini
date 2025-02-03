import { useCart } from "@/context/CartContext";

import Link from "next/link";

import { BsCart3 } from "react-icons/bs";

function NavCart() {
  const { cart, loading, isAuthenticated } = useCart();

  if (loading) {
    return (
      <Link href="/cart" className="nav-main-menu-cart-link">
        <BsCart3 className="nav-main-menu-icon-cart" />
        <span className="nav-main-menu-cart-counter-empty"></span>
      </Link>
    );
  }

  if (!isAuthenticated) {
    return (
      <Link href="/cart" className="nav-main-menu-cart-link">
        <BsCart3 className="nav-main-menu-icon-cart" />
        <span className="nav-main-menu-cart-counter-empty"></span>
      </Link>
    );
  }

  return (
    <Link href="/cart" className="nav-main-menu-cart-link" aria-label="Go to the Cart">
      <BsCart3 className="nav-main-menu-icon-cart" alt="" />
      {cart.products.length > 0 && (
        <span className="nav-main-menu-cart-counter">
          {cart.products.length}
        </span>
      )}
    </Link>
  );
}

export default NavCart;
