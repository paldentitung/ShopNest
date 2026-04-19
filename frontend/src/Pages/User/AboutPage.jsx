import React from "react";
import Aboutus from "../../Components/pages/Aboutus";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SecondaryButton from "../../Components/common/SecondaryButton";
import MainButton from "../../Components/common/MainButton";

const AboutPage = () => {
  const navigate = useNavigate();

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const products = [
    {
      title: "Handmade Jewelry",
      desc: "Unique designs crafted with care by skilled artisans.",
      icon: "💎",
    },
    {
      title: "Eco Bags",
      desc: "Sustainable, stylish, and built for everyday use.",
      icon: "🌿",
    },
    {
      title: "Home Accessories",
      desc: "Bring warmth and charm to every corner of your home.",
      icon: "🏡",
    },
  ];

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

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-gray-200" />
      </div>

      {/* Brand Story */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        className="py-16 px-6 max-w-5xl mx-auto"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 mb-3">
          Our Story
        </p>
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 leading-snug">
          How it all began
        </h2>
        <div className="max-w-2xl space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Founded in 2025, our goal has always been to provide unique,
            high-quality products that bring joy to our customers. We work
            directly with artisans and suppliers to ensure every product meets
            our standards.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is simple: make shopping enjoyable, sustainable, and
            trustworthy for everyone.
          </p>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-white py-20 px-6 text-center flex flex-col"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
        }}
      >
        <p className="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">
          Ready to explore?
        </p>
        <h2 className="text-3xl font-bold mb-3">Explore Our Collection</h2>
        <p className="mb-8 text-white/60 max-w-md mx-auto">
          Join our journey and find products you'll love — crafted with purpose,
          delivered with care.
        </p>
        <div className="w-40 mx-auto">
          <SecondaryButton
            name="Shop Now"
            onClick={() => navigate("/products")}
          />
        </div>
      </motion.section>

      {/* Products Highlight */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white py-20 px-6"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 text-center mb-3">
          What we offer
        </p>
        <h2 className="text-3xl font-semibold mb-3 text-center text-gray-900">
          Our Products
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-center mb-12 leading-relaxed">
          From eco-friendly bags to handcrafted accessories, every item is
          curated with care.
        </p>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              custom={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-8 w-64 text-center"
            >
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {product.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {product.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
