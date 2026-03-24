import React from "react";
import { FaShoppingCart } from "react-icons/fa";
const Wishlist = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold  md:text-lg">Wishlist</span>
        <span>4 items</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-8">
        <div className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative">
          <div className="overflow-hidden h-65">
            <img
              src="../hero-image-1.jpg"
              alt=""
              className="transition-all duration-300 group-hover:scale-110 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-sm px-2 py-4">
            <span>Classic White Sneakers</span>
            <span>$129.00</span>
          </div>

          <div className=" hidden group-hover:block  absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full">
            <FaShoppingCart color="white" size={20} />
          </div>
        </div>
        <div className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative">
          <div className="overflow-hidden h-65">
            <img
              src="../hero-image-1.jpg"
              alt=""
              className="transition-all duration-300 group-hover:scale-110 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-sm px-2 py-4">
            <span>Classic White Sneakers</span>
            <span>$129.00</span>
          </div>

          <div className=" hidden group-hover:block  absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full">
            <FaShoppingCart color="white" size={20} />
          </div>
        </div>{" "}
        <div className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative">
          <div className="overflow-hidden h-65">
            <img
              src="../hero-image-1.jpg"
              alt=""
              className="transition-all duration-300 group-hover:scale-110 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-sm px-2 py-4">
            <span>Classic White Sneakers</span>
            <span>$129.00</span>
          </div>

          <div className=" hidden group-hover:block  absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full">
            <FaShoppingCart color="white" size={20} />
          </div>
        </div>{" "}
        <div className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative">
          <div className="overflow-hidden h-65">
            <img
              src="../hero-image-1.jpg"
              alt=""
              className="transition-all duration-300 group-hover:scale-110 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-sm px-2 py-4">
            <span>Classic White Sneakers</span>
            <span>$129.00</span>
          </div>

          <div className=" hidden group-hover:block  absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full">
            <FaShoppingCart color="white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
