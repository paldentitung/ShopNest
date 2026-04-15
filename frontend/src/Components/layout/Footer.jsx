import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "product", label: "Product", path: "/products" },
    { id: "about", label: "About", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const footerLinks = [
    { id: "faq", label: "Customer Support FAQ", path: "/faq" },
    { id: "shipping", label: "Shipping & Returns", path: "/shipping-returns" },
    { id: "privacy", label: "Privacy Policy", path: "/privacy-policy" },
    { id: "terms", label: "Terms & Conditions", path: "/terms-conditions" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const footerContact = [
    { id: "email", value: "support@shopnest.com" },
    { id: "location", value: "Kathmandu, Nepal" },
    { id: "hours", value: "Mon – Fri, 9 AM – 6 PM" },
  ];

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-(--color-foreground) text-(--color-surface) p-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-5">
        <div className="flex justify-between flex-col md:flex-row gap-6 ">
          {/* Logo & Description */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            variants={sectionVariant}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            <Link to="/user/" className="flex items-center gap-1">
              <span className="bg-(--color-background) text-black w-10 h-10 flex justify-center items-center rounded-full italic">
                SN
              </span>
              <h2 className="text-lg md:text-2xl font-semibold">ShopNest</h2>
            </Link>
            <p className="text-sm">
              Modern fashion, built for the future of online shopping.
            </p>
          </motion.div>

          {/* Nav Links */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            variants={sectionVariant}
            viewport={{ once: true }}
          >
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((item, i) => (
                <motion.li
                  key={item.id}
                  custom={i * 0.05}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border-b border-transparent transition-all duration-300 hover:border-b-(--color-surface)"
                >
                  <Link to={item.path}>{item.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            variants={sectionVariant}
            viewport={{ once: true }}
          >
            <ul className="flex flex-col gap-2.5">
              {footerLinks.map((item, i) => (
                <motion.li
                  key={item.id}
                  custom={i * 0.05}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border-b border-transparent transition-all duration-300 hover:border-b-(--color-surface)"
                >
                  <Link to={item.path}>{item.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            variants={sectionVariant}
            viewport={{ once: true }}
          >
            <ul className="flex flex-col gap-2.5">
              {footerContact.map((item, i) => (
                <motion.li
                  key={item.id}
                  custom={i * 0.05}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border-b border-transparent transition-all duration-300 hover:border-b-(--color-surface)"
                >
                  <span>{item.value}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center flex justify-center items-center opacity-70"
        >
          © {new Date().getFullYear()} ShopNest. All rights reserved.
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
