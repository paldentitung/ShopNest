import { createContext, useState, useEffect, useCallback } from "react";
import { searchProduct } from "../Services/productApi";
import { debounce } from "lodash";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [results, setResults] = useState([]);

  const fetchSearch = async (query) => {
    if (query.trim() === "") {
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
  }, [showSearchBar]);

  return (
    <AppContext.Provider
      value={{
        isExpanded,
        setIsExpanded,
        showSideBar,
        setShowSideBar,
        showModal,
        setShowModal,
        search,
        setSearch,
        showSearchBar,
        setShowSearchBar,
        results,
        setResults,
        fetchSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
