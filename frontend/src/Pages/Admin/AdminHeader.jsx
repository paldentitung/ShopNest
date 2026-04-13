import React from "react";
import { FaUser } from "react-icons/fa";

const AdminHeader = ({ title }) => {
  return (
    <header className="flex justify-between items-center  p-6  bg-white border-b border-gray-100 sticky top-0 z-40">
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>
      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
        <FaUser size={13} />
      </div>
    </header>
  );
};

export default AdminHeader;
