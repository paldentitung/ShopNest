import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    localStorage.setItem("splash", "true");
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 bg-white flex flex-col justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Logo Animation */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.span
              className="w-16 h-16 md:w-20 md:h-20 bg-(--color-foreground) rounded-full flex justify-center items-center text-white font-bold text-xl md:text-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              SN
            </motion.span>

            <motion.span
              className="text-3xl md:text-4xl text-(--color-foreground) font-bold"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
            >
              ShopNest
            </motion.span>
          </motion.div>

          {/* Loader animation */}
          <motion.div
            className="w-14 h-14 border-4 border-(--color-foreground) border-t-transparent rounded-full"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
