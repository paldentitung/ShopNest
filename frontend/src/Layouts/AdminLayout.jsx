import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <aside className="w-70">
        <SideBar />
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
