import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const CheckOutLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="flex flex-col gap-10 mt-25">{children}</main>
    </div>
  );
};

export default CheckOutLayout;
