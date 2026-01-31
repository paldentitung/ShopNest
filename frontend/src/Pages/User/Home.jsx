import React from "react";
import Hero from "../../Components/Hero";
import ProductPage from "./ProductPage";
import Aboutus from "../../Components/Aboutus";
import Contact from "../../Components/Contact";
const Home = () => {
  return (
    <div>
      <Hero />
      <ProductPage />
      <Aboutus />
      <Contact />
    </div>
  );
};

export default Home;
