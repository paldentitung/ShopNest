import React, { useContext, useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaTimes,
  FaBars,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { getNotifications } from "../Services/notificationApi";
import NotificationPanel from "./NotificationPanel";
import { useApp } from "../Hooks/useApp";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notification, setNotification] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("ShopNest-token");

    if (!userToken) {
      console.log("=== EARLY RETURN - NO TOKEN ===");
      return;
    }
    const fetchNotifications = async () => {
      const res = await getNotifications();
      setNotification(res.data);
    };

    fetchNotifications();
  }, []);

  const { showSearchBar, setShowSearchBar } = useApp();
  const { totalItems } = useCart();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-40 flex justify-between items-center p-6  ">
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
          <Link to="/" className="flex items-center gap-1">
            <span
              className={`bg-(--color-foreground) text-white w-10 h-10  flex justify-center items-center rounded-full italic  `}
            >
              SN
            </span>
            <h1 className="text-2xl font-bold">ShopNest</h1>
          </Link>
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
          className={`hidden lg:block backdrop-blur-xl border rounded-3xl px-10 py-3 transition-colors duration-300 ${
            isScroll
              ? "bg-(--color-foreground) text-(--color-surface) border-(--color-foreground)"
              : "bg-(--color-surface)]/30 text-(--color-foreground) border-(--color-border)"
          }`}
        >
          <ul className="flex gap-10 items-center">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path} onClick={() => setShowMenu(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
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
          <button
            type="button"
            className="relative"
            onClick={() => setShowNotification(true)}
          >
            <FaBell size={20} />
            {notification.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-(--color-foreground)  text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {notification.filter((n) => !n.read).length}
              </span>
            )}
          </button>
          <Link to="/cart" className="flex gap-1 items-cente relative ">
            <FaShoppingCart size={20} />
            <span className="absolute -top-3 -right-4 bg-(--color-foreground)  text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </Link>
          <Link to="/user/profile" className="hidden md:block">
            <FaUser size={18} />
          </Link>
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="block lg:hidden"
          >
            <FaBars />
          </div>
        </motion.div>
      </div>

      <NotificationPanel
        setShowNotification={setShowNotification}
        notification={notification}
        showNotification={showNotification}
        setNotification={setNotification}
      />

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white z-50 shadow-lg flex flex-col p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <button
                className="self-end text-gray-700 mb-4"
                onClick={() => setShowMenu(false)}
              >
                <FaTimes size={22} />
              </button>

              {/* 🔥 Profile Section (Top) */}
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border">
                  <img
                    src="/hero-image-3.jpg"
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.username}
                  </p>

                  <Link
                    to="/user/profile"
                    onClick={() => setShowMenu(false)}
                    className="text-xs text-amber-500 hover:underline"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="flex-1">
                <ul className="flex flex-col gap-5">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        onClick={() => setShowMenu(false)}
                        className="text-gray-800 font-medium text-lg hover:text-amber-500 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="mt-auto text-gray-400 text-sm text-center">
                © 2026 ShopNest
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
