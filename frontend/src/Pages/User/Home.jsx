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
      <div>
        <div className="sticky top-0 z-10 h-screen">
          <Aboutus />
        </div>

        <div className="sticky top-0 z-20 h-screen">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Home;
