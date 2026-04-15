import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";

export const useSearch = () => useContext(SearchContext);
