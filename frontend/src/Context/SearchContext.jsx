import { Children, createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <SearchContext.Provider
      value={{ showSearchBar, setShowSearchBar, search, setSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
