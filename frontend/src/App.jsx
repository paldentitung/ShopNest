import React from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Aboutus from "./Components/Aboutus";
import ProductListing from "./Components/ProductListing";
import Contact from "./Components/Contact";
const App = () => {
  return (
    <div className="">
      <Header />
      <Hero />
      <Aboutus />
      <ProductListing />
      <Contact />
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div> <div className="min-h-screen"></div>
    </div>
  );
};

export default App;
