import React from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { useApp } from "../../Hooks/useApp";
import { Link } from "react-router-dom";

const AdminHeader = ({ title }) => {
  const { setShowSideBar } = useApp();

  return (
    <header className="flex justify-between items-center p-6 bg-white border-b border-gray-100 sticky top-0 z-40">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* 🔥 Hamburger (mobile only) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setShowSideBar(true)}
        >
          <FaBars size={18} />
        </button>

        <h1 className="text-base font-semibold text-gray-900">{title}</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
        <Link to="/admin/profile">
          <FaUser size={13} />
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
