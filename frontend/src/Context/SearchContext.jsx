import { createContext, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { searchProduct } from "../Services/productApi";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const fetchSearch = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await searchProduct(query);
      setResults(res.data || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchSearch(query);
    }, 400),
    [],
  );

  useEffect(() => {
    debouncedSearch(search);

    return () => {
      debouncedSearch.cancel();
    };
  }, [search, debouncedSearch]);

  useEffect(() => {
    if (!showSearchBar) {
      setSearch("");
      setResults([]);
    }
  }, [showSearchBar]);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        results,
        showSearchBar,
        setShowSearchBar,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
