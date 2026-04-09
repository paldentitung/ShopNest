import React from "react";
import Hero from "../../Components/Hero";
import ProductPage from "./ProductPage";
import Aboutus from "../../Components/Aboutus";
import Contact from "../../Components/Contact";
import Hero1 from "../../Components/Hero1";
const Home = () => {
  return (
    <div>
      <Hero />
      {/* <Hero1 /> */}
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
