// AdminLayout.jsx
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Pages/Admin/AdminSidebar";
import { SideBarContext } from "../Context/SideBarContext";
import { motion } from "framer-motion";

const AdminLayout = () => {
  const { isExpanded } = useContext(SideBarContext);

  return (
    <div className="flex">
      <AdminSidebar />
      <motion.main
        animate={{ marginLeft: isExpanded ? 256 : 72 }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
        className="flex-1 min-h-screen bg-gray-50 p-6"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default AdminLayout;
