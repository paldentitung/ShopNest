import React from "react";
import MainButton from "./MainButton";

const Aboutus = () => {
  return (
    <section className="flex justify-evenly flex-col-reverse md:flex-row gap-5 mt-10 p-5 w-full max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg md:text-2xl font-semibold">About Us</h2>
          <p>Modern fashion, built for the future of online shopping.</p>
        </div>
        <p className="text-gray-500">
          ShopNest is a modern fashion-focused e-commerce platform designed to
          make discovering stylish and affordable clothing easy and enjoyable.
        </p>
        <p className="text-gray-500">
          We curate trend-driven clothing collections and provide a seamless
          shopping experience where users can browse, filter, and purchase
          fashion items with ease.
        </p>
        <div>
          <MainButton name="Latest Product" />
        </div>{" "}
      </div>
      {/* image */}
      <div>
        <img
          src="/aboutus-image.jpg"
          alt="Fashion styling and clothing collection"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </section>
  );
};

export default Aboutus;
