import React from "react";
import Contact from "../../Components/pages/Contact";
import { motion } from "framer-motion";

const ContactPage = () => {
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
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        className="bg-(--color-foreground) text-white py-20 px-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Have questions or need help? We’re here to assist you.
        </p>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        className="py-8 px-6 max-w-6xl mx-auto"
      >
        <Contact />
      </motion.section>

      {/* Map Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        className="py-8 px-6 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Find Us</h2>
        <div className="w-full h-64 md:h-96 rounded overflow-hidden shadow-md">
          <iframe
            title="Company Location"
            className="w-full h-full"
            frameBorder="0"
            src="https://maps.google.com/maps?q=Kathmandu,Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
          ></iframe>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
