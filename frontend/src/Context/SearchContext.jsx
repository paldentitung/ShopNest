import { createContext, useCallback, useEffect, useState } from "react";
import { searchProduct } from "../Services/productApi";
import { debounce } from "lodash";
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [results, setResults] = useState([]);

  const fetchSearch = async (query) => {
    if (query.trim() == "") {
      setResults([]);
      return;
    }
    const res = await searchProduct(query);
    setResults(res);
  };

  const debouncedSearch = useCallback(
    debounce((query) => fetchSearch(query), 400),
    [],
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search, debouncedSearch]);

  useEffect(() => {
    if (!showSearchBar) {
      setSearch("");
      setResults([]);
    }
  }, [search]);

  return (
    <SearchContext.Provider
      value={{
        showSearchBar,
        setShowSearchBar,
        search,
        setSearch,
        results,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
