import React from "react";
import { FaUser } from "react-icons/fa";
const AdminHeader = ({ title }) => {
  return (
    <header className="flex justify-between items-center p-6 w-full">
      <h1 className="text-lg md:text-2xl font-semibold">{title}</h1>
      <div>
        <FaUser />
      </div>
    </header>
  );
};

export default AdminHeader;
