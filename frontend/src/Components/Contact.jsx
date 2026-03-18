import React from "react";
import MainButton from "./MainButton";
import { motion } from "framer-motion";

const Contact = () => {
  // Variants for fade + slide animation
  const slideVariant = {
    hidden: (direction = 0) => ({
      opacity: 0,
      x: direction === 1 ? 50 : -50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 p-6 mt-16 h-auto md:h-[65vh]">
      {/* Contact Info */}
      <motion.div
        className="flex flex-col gap-4 w-full md:w-1/2"
        custom={-1}
        initial="hidden"
        whileInView="visible"
        variants={slideVariant}
        viewport={{ once: true }}
      >
        <h2 className="text-lg md:text-2xl font-semibold">Contact Us</h2>

        <p className="text-gray-600">
          We’d love to hear from you. Reach out with any questions or feedback.
        </p>

        <ul className="space-y-2 text-gray-700">
          <li>📧 support@shopnest.com</li>
          <li>📍 Kathmandu, Nepal</li>
          <li>⏰ Mon – Fri, 9 AM – 6 PM</li>
        </ul>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="w-full md:w-1/2"
        custom={1}
        initial="hidden"
        whileInView="visible"
        variants={slideVariant}
        viewport={{ once: true }}
      >
        <form className="flex flex-col space-y-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullname" className="text-sm font-medium">
              Full Name *
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              className="border border-(--color-border) p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="border border-(--color-border) p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium">
              Message *
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Write your message here..."
              className="border border-(--color-border) p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>

          <MainButton name="Send Message" type="submit" />
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
