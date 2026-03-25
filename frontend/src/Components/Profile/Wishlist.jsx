import React from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useApp } from "../../Hooks/useApp";
import MainButton from "../MainButton";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import toast from "react-hot-toast";
const Wishlist = () => {
  const { wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();
  const { addItem } = useCart();
  return (
    <div className="bg-white p-6 shadow-md rounded-md min-h-75">
      <div className="flex justify-between items-center text-sm mb-4">
        <span className="font-semibold md:text-lg">Wishlist</span>
        <span>
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-2">
          <p className="mb-2 text-lg font-medium">Your wishlist is empty</p>
          <p>Add products to see them here.</p>
          <MainButton
            name="View Products"
            onClick={() => navigate("/products")}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-8">
          {wishlist.map((w) => (
            <div
              key={w._id}
              className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative"
            >
              <div className="overflow-hidden h-65 bg-gray-100 flex items-center justify-center">
                <img
                  src={`http://localhost:3000/${w.image?.[0] ?? "placeholder.jpg"}`}
                  alt={`${w.name}`}
                  className="transition-all duration-300 group-hover:scale-110 w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col text-sm px-2 py-4">
                <span className="font-medium">{w.name}</span>
                <span className="text-gray-600">
                  ${(w.price / 100).toFixed(2)}
                </span>
              </div>

              <div
                onClick={() => {
                  addItem(w._id, 1);

                  toast.success(`${w.name} added to cart!`);
                }}
                className="hidden group-hover:block absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full"
              >
                <FaShoppingCart color="white" size={20} />
              </div>

              <span
                onClick={() => toggleWishlist(w)}
                className={`
    absolute top-3 right-3 
    px-2 py-2 rounded-full border 
    transition-all duration-300
    cursor-pointer
    flex items-center justify-center
    ${
      wishlist.some((item) => item._id === w._id)
        ? "bg-rose-500 border-rose-500 text-white shadow-lg scale-110"
        : "bg-white/80 border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-rose-500 hover:scale-110"
    }
  `}
              >
                <FaHeart />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
