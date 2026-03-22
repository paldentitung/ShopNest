import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SearchModal from "../Components/SearchModal";
import { useApp } from "../Hooks/useApp";

const UserLayout = () => {
  const { showSearchBar } = useApp();
  const ctx = useApp();
  console.log(ctx);
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
