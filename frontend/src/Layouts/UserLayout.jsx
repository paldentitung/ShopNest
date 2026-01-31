import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
const UserLayout = () => {
  return (
    <div>
      <main className="flex flex-col gap-10">
        <div>
          <Header />
        </div>

        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
