"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

function NavSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      const newState = !prev;
      if (newState) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      return newState;
    });
    setQuery("");
  };

  useEffect(() => {
    const isSearchRoute = pathname.startsWith("/products?search=");
    const isProductsMain = pathname === "/products";
    if (!isSearchRoute && !isProductsMain) {
      setQuery("");
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <li className="flex items-center relative">
      {/* Icono visible siempre */}
      <button
        onClick={toggleSearch}
        aria-label={isSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
        className="text-white text-2xl cursor-pointer hover:text-red-500"
      >
        <IoSearchSharp aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1200] bg-black/60 flex flex-col"
          >
            <motion.div
              ref={searchRef}
              initial={{ y: -80 }}
              animate={{ y: 0 }}
              exit={{ y: -80 }}
              transition={{ duration: 0.3 }}
              className="h-[11vh] w-full bg-neutral-900 flex items-center justify-center px-4"
            >
              <form
                onSubmit={handleSearch}
                className="flex items-center w-full sm:w-4/5 gap-2"
              >
                <IoSearchSharp
                  className="text-white text-3xl cursor-pointer hover:text-red-500 transition"
                  onClick={handleSearch}
                />
                <input
                  ref={inputRef}
                  type="text"
                  name="search"
                  aria-label="Buscar productos"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="¿Qué estás buscando?"
                  className="w-full px-4 py-2 text-base text-white placeholder:text-neutral-400 bg-neutral-800 border border-neutral-700 rounded-md outline-none"
                />
                <button
                  onClick={toggleSearch}
                  className="p-1.5 text-2xl text-white bg-neutral-950/50 hover:bg-black hover:text-red-500 rounded-full transition"
                  aria-label="Cerrar búsqueda"
                >
                  <IoClose />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default NavSearch;
