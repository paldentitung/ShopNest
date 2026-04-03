import React from "react";
import { motion } from "framer-motion";

const SecondaryButton = ({ name, onClick, type }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      type={type}
      className="inline-block items-center justify-center gap-2.5 w-full px-6 py-3 rounded-xl bg-white text-gray-900 border border-gray-300 text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-gray-100 active:scale-95 hover:cursor-pointer"
    >
      {name}
    </motion.button>
  );
};

export default SecondaryButton;
