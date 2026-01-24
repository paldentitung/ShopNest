import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6">
      {/* Logo */}
      <div
        className={` rounded-3xl px-3 py-1 transition-colors duration-300 ${
          isScroll
            ? "bg-(--color-foreground) text-(--color-surface) border-(--color-foreground)"
            : "bg-(--color-surface)]/30 text-(--color-foreground) border-(--color-border)"
        }`}
      >
        <h1 className="text-2xl font-bold">ShopNest</h1>
      </div>

      {/* Navbar */}
      <nav
        className={`backdrop-blur-xl border rounded-3xl  px-10 py-3 transition-colors duration-300 ${
          isScroll
            ? "bg-(--color-foreground) text-(--color-surface) border-(--color-foreground)"
            : "bg-(--color-surface)]/30 text-(--color-foreground) border-(--color-border)"
        }`}
      >
        <ul className="flex gap-10 items-center">
          <li>Home</li>
          <li>Product</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* Cart & User */}
      <div
        className={`flex items-center gap-4 py-2  px-5 rounded-3xl transition-colors duration-300 ${
          isScroll
            ? "bg-(--color-foreground) text-(--color-surface) border-(--color-foreground)"
            : "bg-(--color-surface)]/30 text-(--color-foreground) border-(--color-border)"
        } `}
      >
        <div className="flex gap-1 items-center">
          <FaShoppingCart size={18} />
          <span>12</span>
        </div>
        <div>
          <FaUser size={18} />
        </div>
      </div>
    </div>
  );
};

export default Header;
