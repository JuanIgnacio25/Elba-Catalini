import { useCart } from "@/context/CartContext";
import Link from "next/link";

import { BsCart3 } from "react-icons/bs";

function NavCart() {
  const { cart, loading } = useCart();

  return (
    <Link
      href="/cart"
      className="relative text-white inline-block"
      aria-label="Go to the Cart"
    >
      <BsCart3 className="text-2xl hover:text-red-500 transition" />
      {loading ? (
        <span className="absolute -top-[11px] -right-[13px] bg-red-600 text-white opacity-0 rounded-full w-4 h-4 text-[0px] flex items-center justify-center transition-all"></span>
      ) : (
        cart.products.length > 0 && (
          <span className="absolute -top-[10px] -right-[12px] bg-red-600 text-white rounded-full px-1 min-w-4 text-[11px] font-bold text-center leading-4 flex items-center justify-center select-none transition-all">
            {cart.products.length}
          </span>
        )
      )}
    </Link>
  );
}

export default NavCart;
