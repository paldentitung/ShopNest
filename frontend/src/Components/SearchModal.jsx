import React, { useContext, useRef, useEffect } from "react";
import { SearchContext } from "../Context/SearchContext";

const SearchModal = () => {
  const { showSearchBar, setShowSearchBar } = useContext(SearchContext);
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
        onClick={() => setShowSearchBar(false)}
        className="fixed inset-0 bg-black/40 z-40"
      ></div>

      {/* Search Input */}
      <div className="fixed top-32 left-1/2 -translate-x-1/2 w-full  max-w-2xl lg:max-w-4xl px-4 z-50">
        <input
          type="search"
          ref={inputRef}
          className="w-full p-4 rounded-2xl text-lg text-gray-900 bg-white outline-none shadow-md placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-neutral-500"
          placeholder="Search for products..."
        />
      </div>

      {/* Search Results */}
      <ul className="fixed top-48 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl lg:max-w-4xl flex flex-col gap-4 px-4 py-2 rounded-2xl bg-white shadow-lg ">
        <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition">
          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60"
            alt="Laptop"
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">Laptop</span>
            <span className="text-gray-500">$400</span>
          </div>
        </li>
        <li className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition">
          <img
            src="https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60"
            alt="Headphones"
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">Headphones</span>
            <span className="text-gray-500">$120</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SearchModal;
