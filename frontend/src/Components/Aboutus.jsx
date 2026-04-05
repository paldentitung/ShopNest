import React from "react";
import MainButton from "./MainButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { value: "2K+", label: "Happy customers" },
  { value: "500+", label: "Products" },
  { value: "98%", label: "Satisfaction" },
];

const pillars = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
    ),
    title: "Curated Style",
    desc: "Trend-driven collections refreshed every season.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
        />
      </svg>
    ),
    title: "Seamless Shopping",
    desc: "Browse, filter, and checkout in seconds.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Quality First",
    desc: "Every item vetted for fit, feel, and finish.",
  },
];

const Aboutus = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex items-center">
      {/* Accent blob */}
      <div className="absolute -top-32 -right-32 w-125 h-135 rounded-full bg-black/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left — Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-[45%] shrink-0"
        >
          <div className="relative">
            <div className="absolute -inset-3 border border-black/10 rounded-2xl" />
            <img
              src="/aboutus-image.jpg"
              alt="ShopNest fashion collection"
              className="relative w-full h-72 md:h-105 object-cover rounded-xl"
            />
            <div className="absolute bottom-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
              Est. 2024
            </div>
          </div>
        </motion.div>

        {/* Right — Content */}
        <div className="flex flex-col gap-8 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-black/50 mb-3 font-medium">
              Our story
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-black">
              Fashion for the
              <br />
              <span className="text-black/50">digital age.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-black/70 text-sm leading-relaxed max-w-md"
          >
            ShopNest is a MERN stack e-commerce platform built to make
            discovering stylish, affordable clothing effortless — from browsing
            to checkout.
          </motion.p>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {pillars.map((p) => (
              <div key={p.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg border border-black/10 flex items-center justify-center shrink-0 text-black/50">
                  {p.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-black/90">
                    {p.title}
                  </p>
                  <p className="text-xs text-black/50 mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stats + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex items-center gap-8 flex-wrap"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-black">{s.value}</p>
                <p className="text-xs text-black/50 mt-0.5">{s.label}</p>
              </div>
            ))}
            <button
              onClick={() => navigate("/products")}
              className="ml-auto bg-black text-white text-xs font-bold px-5 py-2.5 rounded-full tracking-wider uppercase hover:bg-black/90 transition-colors"
            >
              Shop now →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
