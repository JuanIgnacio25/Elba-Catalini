"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoSearchSharp } from "react-icons/io5";

function NavSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <li className="nav-main-search">
      <form onSubmit={handleSearch} className="nav-main-search-form">
        <input
          placeholder="¿Que estas buscando?" /* Buscar productos... */
          className="nav-main-search-form-input"
          name="nav-main-search-form-input"
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
