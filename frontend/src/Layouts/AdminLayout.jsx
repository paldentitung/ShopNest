import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Pages/Admin/AdminSidebar";
import { useApp } from "../Hooks/useApp";

const AdminLayout = () => {
  const { isExpanded, showSideBar, setShowSideBar } = useApp();

  return (
    <div className="flex min-h-screen">
      <div
        className={`
          hidden md:flex flex-col bg-gray-900 text-white
          transition-all duration-300
          ${isExpanded ? "w-72" : "w-18"}
        `}
      >
        <AdminSidebar />
      </div>

      <div className="flex-1 bg-gray-50 min-h-screen overflow-x-hidden">
        <Outlet />
      </div>

      {showSideBar && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSideBar(false)}
          />

          <div className="absolute left-0 top-0 h-full w-72 bg-gray-900">
            <AdminSidebar mobile />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
