import React from "react";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="hidden md:flex flex-col space-y-5 bg-(--color-foreground) h-screen text-(--color-surface) p-4 w-70 fixed">
      <div>
        <h1 className="text-lg md:text-2xl p-3 font-bold">ShopNest</h1>
      </div>
      <nav>
        <ul className="flex flex-col gap-4">
          <li className="text-sm p-3  transition-all duration-300  rounded-md  hover:bg-gray-700 hover:text-white">
            <Link to="/admin" className="block">
              Dashboard
            </Link>
          </li>{" "}
          <li className="text-sm p-3  transition-all duration-300  rounded-md  hover:bg-gray-700 hover:text-white">
            <Link to="/admin/productmanagement" className="block">
              Product Management
            </Link>
          </li>{" "}
          <li className="text-sm p-3  transition-all duration-300  rounded-md  hover:bg-gray-700 hover:text-white">
            <Link to="/admin/ordermanagement" className="block">
              Order Management
            </Link>
          </li>
          <li className="text-sm p-3  transition-all duration-300  rounded-md  hover:bg-gray-700 hover:text-white">
            <Link to="/admin/usermanagement" className="block">
              User Management
            </Link>
          </li>
          <li className="text-sm p-3  transition-all duration-300  rounded-md  hover:bg-gray-700 hover:text-white">
            <Link to="/admin/profile" className="block">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
