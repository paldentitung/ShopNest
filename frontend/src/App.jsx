import React from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Aboutus from "./Components/Aboutus";
import ProductListing from "./Components/ProductListing";
const App = () => {
  return (
    <div className="">
      <Header />
      <Hero />
      <Aboutus />
      <ProductListing />
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div> <div className="min-h-screen"></div>
    </div>
  );
};

export default App;
