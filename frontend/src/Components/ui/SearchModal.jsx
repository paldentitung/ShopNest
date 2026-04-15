import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../Hooks/useApp";
import { useSearch } from "../../Hooks/useSearch";

const SearchModal = () => {
  const { showSearchBar, setShowSearchBar, setSearch, results } = useSearch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSearchBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearchBar]);

  if (!showSearchBar) return null;

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={() => {
          setShowSearchBar(false);
          setSearch("");
        }}
        className="fixed inset-0 bg-black/40 z-40"
      ></div>

      {/* Search Input */}
      <div className="fixed top-32 left-1/2 -translate-x-1/2 w-full  max-w-2xl lg:max-w-4xl px-4 z-50">
        <input
          type="search"
          ref={inputRef}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-2xl text-lg text-gray-900 bg-white outline-none shadow-md placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-neutral-500"
          placeholder="Search for products..."
        />
      </div>

      {results.length > 0 ? (
        <>
          {/* Search Results */}
          <ul className="fixed top-48 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl lg:max-w-4xl flex flex-col gap-4 px-4 py-2 rounded-2xl bg-white shadow-lg ">
            {results.map((item) => (
              <Link
                key={item._id}
                to={`/user/productdetails/${item.slug}`}
                onClick={() => {
                  setShowSearchBar(false);
                  setSearch("");
                }}
              >
                <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition">
                  <img
                    src={`http://localhost:3000/${item.images[0]}`}
                    alt="Laptop"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {item.name}
                    </span>
                    <span className="text-gray-500">
                      ${item.priceCents / 100}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </>
      ) : (
        <div className="fixed top-50 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl lg:max-w-4xl flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white shadow-lg text-gray-500">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>

          {/* Message */}
          <p className="text-sm font-medium">
            Start typing to search for products
          </p>

          <span className="text-xs text-gray-400">
            Try searching for laptops, phones, accessories...
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
