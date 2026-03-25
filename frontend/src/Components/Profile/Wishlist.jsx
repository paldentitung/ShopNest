import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { getWishlist } from "../../Services/wishlistApi";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await getWishlist();

        setWishlist(res.wishlist);
      } catch (error) {
        console.error("Fetch error:", error);
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, []);
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold  md:text-lg">Wishlist</span>
        <span>4 items</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-8">
        {wishlist.map((w) => (
          <div
            key={w._id}
            className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative"
          >
            <div className="overflow-hidden h-65">
              <img
                src={`http://localhost:3000/${w.image[0]}`}
                alt={`${w.name} `}
                className="transition-all duration-300 group-hover:scale-110 w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col text-sm px-2 py-4">
              <span>{w.name}</span>
              <span>${(w.price / 100).toFixed(2)}</span>
            </div>

            <div className="hidden group-hover:block absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full">
              <FaShoppingCart color="white" size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
