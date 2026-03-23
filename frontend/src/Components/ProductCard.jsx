import React from "react";
import SecondaryButton from "./SecondaryButton";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();

  const handleAddItem = () => {
    addItem(product._id, Number(quantity));
    toast.success("Product Added");
  };

  const navigate = useNavigate();

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-100"
      style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.06)" }}
    >
      <div className="relative w-full h-60 sm:h-64 bg-gray-50 overflow-hidden">
        <img
          src={product.images}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-gray-500 text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-gray-200">
          {product.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-snug flex-1">
            {product.name}
          </h3>
          <span className="text-base font-bold text-gray-900 whitespace-nowrap">
            ${product.priceCents / 100}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {product.totalRatings > 0 ? (
            <>
              <StarRow rating={parseFloat(product.averageRating)} />
              <span className="text-xs text-gray-400 font-medium">
                ({product.totalRatings})
              </span>
            </>
          ) : (
            <span className="text-xs text-gray-400 italic">No reviews yet</span>
          )}
        </div>

        <div className="border-t border-dashed border-gray-200" />

        <div className="flex items-center gap-3">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="flex-1 p-2 text-sm border border-gray-200 rounded-lg outline-none bg-gray-50 text-gray-700 cursor-pointer focus:ring-2 focus:ring-gray-300 transition"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                Qty: {num}
              </option>
            ))}
          </select>

          <SecondaryButton
            name="View"
            onClick={() => navigate(`/user/productdetails/${product.slug}`)}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddItem}
          className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-gray-700 active:scale-95 hover:cursor-pointer"
        >
          <FaShoppingCart className="text-base" />
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const StarRow = ({ rating, size = "text-amber-400 text-sm" }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} className="text-gray-300" />);
  }
  return <span className={`flex gap-0.5 ${size}`}>{stars}</span>;
};

export default ProductCard;
