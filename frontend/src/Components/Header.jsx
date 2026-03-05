import React, { useContext, useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaTimes,
  FaBars,
  FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";
import { useCart } from "../Context/CartContext";
const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { showSearchBar, setShowSearchBar } = useContext(SearchContext);
  const { totalItems } = useCart();
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 ">
        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0 }}
          className={`rounded-3xl px-3 py-1 transition-colors duration-300 ${
            isScroll
              ? "bg-(--color-foreground) text-(--color-surface) border-(--color-foreground)"
              : "bg-(--color-surface)]/30 text-(--color-foreground) border-(--color-border)"
          }`}
        >
          <h1 className="text-2xl font-bold">ShopNest</h1>
        </motion.div>

        {/* Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.1,
          }}
          className={`hidden md:block backdrop-blur-xl border rounded-3xl px-10 py-3 transition-colors duration-300 ${
            isScroll
              ? "bg-(--color-foreground) text-(--color-surface) border-(--color-foreground)"
              : "bg-(--color-surface)]/30 text-(--color-foreground) border-(--color-border)"
          }`}
        >
          <ul className="flex gap-10 items-center">
            <li>
              <Link to="/user">Home</Link>
            </li>
            <li>
              <Link to="/user/products">Product</Link>
            </li>
            <li>
              <Link to="/user/about">About</Link>
            </li>
            <li>
              <Link to="/user/contact">Contact</Link>
            </li>
          </ul>
        </motion.nav>

        {/* Cart & User */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.2,
          }}
          className={`flex items-center gap-4 py-2 px-5 rounded-3xl transition-colors duration-300 ${
            isScroll
              ? "bg-(--color-foreground) text-(--color-surface) border-(--color-foreground)"
              : "bg-(--color-surface)]/30 text-(--color-foreground) border-(--color-border)"
          }`}
        >
          <div className="relative flex items-center">
            {/* Search Icon */}
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              <FaSearch />
            </button>
          </div>
          <Link to="/cart" className="flex gap-1 items-cente relative ">
            <FaShoppingCart size={20} />
            <span className="absolute -top-3 -right-4 bg-(--color-foreground)  text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </Link>
          <div className="hidden md:block">
            <FaUser size={18} />
          </div>
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="block md:hidden"
          >
            <FaBars />
          </div>
        </motion.div>
      </div>

      {showMenu && (
        <div className=" fixed inset-0 bg-(--color-background) h-full w-full flex flex-col gap-4 z-50 justify-center items-center ">
          <nav className={``}>
            <ul className="flex  flex-col gap-6 items-center">
              <li>Home</li>
              <li>Product</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>
          <div
            onClick={() => setShowMenu(!showMenu)}
            className=" absolute top-5 right-5 text-lg"
          >
            <FaTimes />
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default Header;
