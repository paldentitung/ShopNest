import { Outlet } from "react-router-dom";
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
import SearchModal from "../Components/ui/SearchModal";
import { useApp } from "../Hooks/useApp";
import { useSearch } from "../Hooks/useSearch";

const UserLayout = () => {
  const { showSearchBar } = useSearch();
  const ctx = useApp();
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
