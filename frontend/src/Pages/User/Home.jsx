import React from "react";
import Hero from "../../Components/pages/Hero";
import ProductPage from "./ProductPage";
import Aboutus from "../../Components/pages/Aboutus";
import Contact from "../../Components/pages/Contact";
const Home = () => {
  return (
    <div>
      <Hero />
      <ProductPage isHidden={true} productLimit={6} />
      <div className="flex flex-col gap-5">
        <div className="sm:sticky sm:top-0 sm:z-10 sm:h-screen">
          <Aboutus />
        </div>

        <div className="sm:sticky sm:top-0 sm:z-20 sm:h-scree ">
          <Contact />
        </div>
      </div>
    </div>
  );
};
export default Home;
