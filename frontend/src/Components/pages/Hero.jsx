import React from "react";
import MainButton from "../common/MainButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Hero = () => {
  const imageVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const navigate = useNavigate();

  const images = [
    "/hero-image-5.jpg",
    "/hero-image-2.jpg",
    "/hero-image-6.jpg",
    "/hero-image-1.jpg",
    "/hero-image-7.jpg",
    "/hero-image-3.jpg",
    "/hero-image-4.jpg",
  ];

  return (
    <div className="h-auto lg:min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-10 ">
      <div className="text-center mb-12 flex flex-col space-y-1">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Shop the Future Today
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the latest trends and must-have products delivered to your
          doorstep
        </p>
        <div className="w-40 mx-auto">
          <MainButton
            name="View Products"
            onClick={() => navigate("/products")}
          />
        </div>
      </div>

      <div className="flex lg:hidden gap-3 overflow-x-auto pb-3 -mx-2 px-4 snap-x snap-mandatory scrollbar-none  ">
        {images.map((src, i) => (
          <motion.div
            key={src}
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="shrink-0 w-56 h-72 rounded-md shadow-lg overflow-hidden snap-start bg-gray-400"
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </div>

      <div className="hidden lg:grid grid-cols-3 lg:grid-cols-5 gap-5">
        <div className="flex flex-col gap-4">
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0 }}
            className="bg-gray-400 rounded-md shadow-lg h-72"
          >
            <img
              src="/hero-image-5.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-400 rounded-md shadow-lg h-72"
          >
            <img
              src="/hero-image-2.jpg"
              alt=""
              className="h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Column 2 */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center items-center"
        >
          <div className="bg-gray-400 rounded-md shadow-lg h-72 w-full">
            <img
              src="/hero-image-6.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Column 3 */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center items-center"
        >
          <div className="bg-gray-400 rounded-md shadow-lg h-52 w-full">
            <img
              src="/hero-image-1.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Column 4 */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center items-center"
        >
          <div className="bg-gray-400 rounded-md shadow-lg h-72 w-full">
            <img
              src="/hero-image-7.jpg"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Column 5 */}
        <div className="flex flex-col gap-4">
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-400 rounded-md shadow-lg h-72"
          >
            <img
              src="/hero-image-3.jpg"
              alt=""
              className="h-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-gray-400 rounded-md shadow-lg h-72"
          >
            <img
              src="/hero-image-4.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
