import React from "react";
import Aboutus from "../../Components/Aboutus";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SecondaryButton from "../../Components/common/SecondaryButton";
import MainButton from "../../Components/common/MainButton";
const AboutPage = () => {
  const navigate = useNavigate();

  // Animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 mt-10">
      {/* About Us */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
      >
        <div className="py-16 px-6 max-w-5xl mx-auto">
          <Aboutus />
        </div>
      </motion.div>

      {/* Brand Story */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        className="py-16 px-6 max-w-5xl mx-auto"
      >
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
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-(--color-foreground) text-white py-16 px-6 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Explore Our Collection</h2>
        <p className="mb-6">Join our journey and find products you’ll love.</p>
        <SecondaryButton
          name="Shop Now"
          onClick={() => navigate("/products")}
        />
      </motion.section>

      {/* Products Highlight */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-100 py-16 px-6"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Our Products
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-center mb-8">
          From eco-friendly bags to handcrafted accessories, every item is
          curated with care.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              title: "Handmade Jewelry",
              desc: "Unique designs crafted with care.",
            },
            { title: "Eco Bags", desc: "Sustainable and stylish products." },
            { title: "Home Accessories", desc: "Bring charm to your home." },
          ].map((product, index) => (
            <motion.div
              key={product.title}
              custom={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white shadow-md rounded-lg p-6 w-64 text-center"
            >
              <h3 className="font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm">{product.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
