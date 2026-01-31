import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  // simple animation variant for images
  const imageVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Shop the Future Today
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the latest trends and must-have products delivered to your
          doorstep
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0 }}
            className="bg-gray-400 rounded-md shadow-lg h-72"
          >
            <img
              src="hero-image-5.jpg"
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
              src="hero-image-2.jpg"
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
              src="hero-image-6.jpg"
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
              src="public/hero-image-1.jpg"
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
              src="hero-image-7.jpg"
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
              src="hero-image-3.jpg"
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
              src="hero-image-4.jpg"
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
