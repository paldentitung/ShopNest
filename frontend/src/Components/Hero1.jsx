import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tags = ["New Arrivals", "Men", "Women", "Accessories", "Sale"];

const floatingItems = [
  { label: "Free shipping over $50", top: "18%", left: "72%", delay: 0 },
  { label: "500+ styles", top: "68%", left: "68%", delay: 0.15 },
  { label: "New drop weekly", top: "42%", left: "76%", delay: 0.3 },
];

const Hero1 = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden flex items-center ">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute right-[-0.05em] top-1/2 -translate-y-1/2 text-[28vw] font-black text-black/3 leading-none select-none pointer-events-none tracking-tighter">
        SN
      </div>

      <div className="absolute bottom-0 left-1/4 w-150 h-75 bg-black/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10 md:gap-0">
        <div className="flex-1 flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className="w-6 h-px bg-black/20" />
            <p className="text-xs tracking-[0.35em] uppercase text-black/30 font-semibold">
              ShopNest — 2024 Collection
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black leading-[0.92] tracking-tight text-black"
          >
            Dress for
            <br />
            <span className="text-black/25">the moment.</span>
            <br />
            Shop for
            <br />
            <span className="italic font-light text-black/60">tomorrow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-sm text-black/50 leading-relaxed max-w-sm"
          >
            Curated fashion for every occasion. Discover trending styles,
            everyday essentials, and statement pieces — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex items-center gap-4 flex-wrap"
          >
            <button
              onClick={() => navigate("/products")}
              className="bg-black text-white text-xs font-bold px-6 py-3.5 rounded-full tracking-widest uppercase hover:bg-black/90 active:scale-[0.97] transition-all duration-150"
            >
              Shop now →
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-black/40 text-xs font-semibold tracking-widest uppercase hover:text-black/70 transition-colors duration-150 underline underline-offset-4"
            >
              View lookbook
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-2 flex-wrap"
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => navigate("/products")}
                className="text-[11px] font-semibold px-3 py-1 rounded-full border border-black/10 text-black/30 hover:border-black/30 hover:text-black/60 transition-all duration-150 tracking-wide"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative w-full md:w-[48%] shrink-0"
        >
          {/* Decorative offset frame */}
          <div className="absolute -inset-3 border border-black/6 rounded-3xl" />
          <div className="absolute -inset-6 border border-black/3 rounded-3xl" />

          <img
            src="/hero-image.jpg"
            alt="ShopNest fashion"
            className="relative w-full h-72 md:h-125 object-cover rounded-2xl grayscale contrast-90"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-white/60 backdrop-blur-sm rounded-b-2xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-black/40 uppercase tracking-widest font-semibold">
                New this week
              </p>
              <p className="text-sm font-bold text-black mt-0.5">
                Summer Essentials Drop
              </p>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-black/90 transition-colors shrink-0"
            >
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
          </div>

          {floatingItems.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + item.delay,
                ease: "easeOut",
              }}
              className="absolute bg-black/10 backdrop-blur-md border border-black/10 text-black text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                top: item.top,
                left: item.left,
                transform: "translateX(-50%)",
              }}
            >
              {item.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-[10px] text-black/20 uppercase tracking-[0.3em] font-semibold">
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-linear-to-b from-black/20 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero1;
