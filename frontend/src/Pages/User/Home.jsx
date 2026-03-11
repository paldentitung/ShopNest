import React from "react";
import Hero from "../../Components/Hero";
import ProductPage from "./ProductPage";
import Aboutus from "../../Components/Aboutus";
import Contact from "../../Components/Contact";
const Home = () => {
  return (
    <div>
      <Hero />
      <ProductPage isHidden={true} productLimit={6} />
      <Aboutus />
      <Contact />
    </div>
  );
};

export default Home;
