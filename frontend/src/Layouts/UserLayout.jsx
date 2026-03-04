import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { SearchContext } from "../Context/SearchContext";
import SearchModal from "../Components/SearchModal";

const UserLayout = () => {
  const { showSearchBar } = useContext(SearchContext);

  return (
    <div>
      <Header />
      <main className="flex flex-col gap-10 mt-10">
        {showSearchBar && <SearchModal />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
