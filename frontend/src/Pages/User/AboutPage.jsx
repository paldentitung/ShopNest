import React from "react";
import MainButton from "../../Components/MainButton";
import Aboutus from "../../Components/Aboutus";
import SecondaryButton from "../../Components/SecondaryButton";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 mt-10">
      <div className="py-16 px-6 max-w-5xl mx-auto">
        <Aboutus />
      </div>
      {/* Brand Story */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Founded in 2020, our goal has always been to provide unique,
          high-quality products that bring joy to our customers. We work
          directly with artisans and suppliers to ensure every product meets our
          standards.
        </p>
        <p className="text-gray-700">
          Our mission is simple: make shopping enjoyable, sustainable, and
          trustworthy for everyone.
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-(--color-foreground) text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Explore Our Collection</h2>
        <p className="mb-6">Join our journey and find products you’ll love.</p>
        <SecondaryButton
          name="Shop Now"
          onClick={() => navigate("/user/products")}
        />
      </section>

      {/* Products Highlight */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Our Products
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-center mb-8">
          From eco-friendly bags to handcrafted accessories, every item is
          curated with care.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
            <h3 className="font-bold mb-2">Handmade Jewelry</h3>
            <p className="text-gray-600 text-sm">
              Unique designs crafted with care.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
            <h3 className="font-bold mb-2">Eco Bags</h3>
            <p className="text-gray-600 text-sm">
              Sustainable and stylish products.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
            <h3 className="font-bold mb-2">Home Accessories</h3>
            <p className="text-gray-600 text-sm">Bring charm to your home.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
