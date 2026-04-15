import { createContext, useState, useEffect, useCallback } from "react";
import { searchProduct } from "../Services/productApi";
import { debounce } from "lodash";
import {
  addWishlist,
  removeWishlist,
  getWishlist,
} from "../Services/wishlistApi";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [results, setResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const fetchSearch = async (query) => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const res = await searchProduct(query);
    setResults(res.data);
  };

  const debouncedSearch = useCallback(
    debounce((query) => fetchSearch(query), 400),
    [],
  );
  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();

      setWishlist(res.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setWishlist([]);
    }
  };

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

  useEffect(() => {
    const userToken = localStorage.getItem("ShopNest-token");
    if (!userToken) return;
    fetchWishlist();
  }, []);
  const toggleWishlist = async (product) => {
    if (!product?._id) return;

    const exists = wishlist.some((item) => item._id === product._id);

    try {
      if (exists) {
        setWishlist((prev) => prev.filter((item) => item._id !== product._id));

        toast.success("Removed from wishlist");

        await removeWishlist(product._id);
      } else {
        setWishlist((prev) => [...prev, product]);

        toast.success("Added to wishlist");

        await addWishlist(product._id);
      }

      await fetchWishlist();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");

      await fetchWishlist();
    }
  };
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
        wishlist,
        setWishlist,
        toggleWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
