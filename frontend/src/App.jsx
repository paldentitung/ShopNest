import React from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Aboutus from "./Components/Aboutus";
import ProductListing from "./Components/ProductListing";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import ProductPage from "./Pages/ProductPage";
const App = () => {
  return (
    <div className="">
      <Header />
      <Hero />
      <Aboutus />
      <Contact />
      <Footer />

      <ProductPage />
    </div>
  );
};

export default App;
