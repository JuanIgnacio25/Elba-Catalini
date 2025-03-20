"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoSearchSharp, IoClose } from "react-icons/io5";

function NavSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    const isSearchRoute = pathname.startsWith("/products?search=");
    const isProductsMain = pathname === "/products";
    
    if (!isSearchRoute && !isProductsMain) {
      setQuery("");
    }
  }, [pathname]);

  return (
    <li className="nav-main-search">
      <form onSubmit={handleSearch} className="nav-main-search-form">
        <input
          ref={inputRef}
          placeholder="¿Qué estás buscando?"
          className="nav-main-search-form-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="nav-main-search-form-button">
          <IoSearchSharp className="nav-main-search-icon" />
        </button>
      </form>
    </li>
  );
}

export default NavSearch;