"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { IoSearchSharp, IoClose } from "react-icons/io5";

function NavSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null); // Referencia para el input

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      const newState = !prev;
      if (newState) {
        setTimeout(() => inputRef.current?.focus(), 100); // Enfocar con un pequeño delay
      }
      return newState;
    });
    setQuery("");
  };

  return (
    <li className="nav-main-search">
      <form onSubmit={handleSearch} className="nav-main-search-form">
        <input
          placeholder="¿Que estas buscando?"
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

      <IoSearchSharp
        className="nav-main-search-responsive"
        onClick={toggleSearch}
      />

      {isSearchOpen && (
        <div
          className={`nav-main-search-dropdown absolute top-0 left-0 w-full h-full bg-white border flex items-center p-2 z-50 overflow-hidden`}
        >
          <form onSubmit={handleSearch} className="flex items-center flex-grow">
            <input
              ref={inputRef}
              placeholder="Buscar..."
              className="flex-grow px-4 py-2 outline-none"
              name="nav-main-search-dropdown-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <div className="px-3">
            <IoClose
              className="text-2xl text-gray-600 cursor-pointer"
              onClick={toggleSearch}
            />
          </div>
        </div>
      )}
    </li>
  );
}

export default NavSearch;
