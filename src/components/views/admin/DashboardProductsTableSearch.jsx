"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function DashboardProductsTableSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setQuery(searchQuery);
    setSearchTerm(searchQuery);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      router.push(`/admin/dashboard?search=${encodeURIComponent(trimmedQuery)}`);
      setSearchTerm(trimmedQuery);
    } else {
      router.push(`/admin/dashboard`);
      setSearchTerm("");
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchTerm("");
    router.push(`/admin/dashboard`);
  };

  return (
    <div className="relative flex items-center gap-3">
      <form onSubmit={handleSearch} className="relative">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          id="table-search"
          className="block py-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:outline-none focus:border-red-500"
          placeholder="Buscar productos..."
        />
        <button type="submit" className="absolute inset-y-0 start-0 flex items-center ps-3">
          <IoIosSearch className="w-5 h-5 text-gray-400" />
        </button>
      </form>

      {searchTerm && (
        <div className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
          <span>{searchTerm}</span>
          <button onClick={clearSearch} className="focus:outline-none">
            <IoClose className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardProductsTableSearch;