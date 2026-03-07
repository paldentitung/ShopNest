import { createContext, useEffect, useState } from "react";
import { searchProduct } from "../Services/productApi";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [results, setResults] = useState([]);

  const fetchSearch = async () => {
    const res = await searchProduct(search);
    setResults(res);
  };

  useEffect(() => {
    if (search.trim() !== "") {
      fetchSearch();
    } else {
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
