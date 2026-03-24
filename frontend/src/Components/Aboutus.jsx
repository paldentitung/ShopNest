import React from "react";
import MainButton from "./MainButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Aboutus = () => {
  const navigate = useNavigate();

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="flex justify-evenly flex-col-reverse md:flex-row gap-5 mt-10 p-5 w-full max-w-7xl mx-auto overflow-x-hidden h-auto md:h-[60vh]">
      <motion.div
        className="flex flex-col space-y-5"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          custom={0}
          variants={textVariant}
          className="flex flex-col gap-1"
        >
          <h2 className="text-lg md:text-2xl font-semibold">About Us</h2>
          <p>Modern fashion, built for the future of online shopping.</p>
        </motion.div>

        {[
          "ShopNest is a modern fashion-focused e-commerce platform designed to make discovering stylish and affordable clothing easy and enjoyable.",
          "We curate trend-driven clothing collections and provide a seamless shopping experience where users can browse, filter, and purchase fashion items with ease.",
          "Our vision is to grow ShopNest into a trusted fashion destination that combines quality, convenience, and modern technology.",
          "ShopNest is a personal MERN stack project created to explore real-world e-commerce workflows including authentication, product management, and order processing.",
        ].map((text, i) => (
          <motion.p
            key={i}
            custom={i + 1}
            variants={textVariant}
            className="text-gray-500"
          >
            {text}
          </motion.p>
        ))}

        <motion.div custom={5} variants={textVariant}>
          <MainButton
            name="Latest Product"
            onClick={() => navigate("/products")}
          />
        </motion.div>
      </motion.div>

      {/* image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src="/aboutus-image.jpg"
          alt="Fashion styling and clothing collection"
          className="w-full h-full object-cover rounded-xl"
        />
      </motion.div>
    </section>
  );
};

export default Aboutus;
