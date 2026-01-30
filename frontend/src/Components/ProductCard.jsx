import React from "react";
import rating50 from "../assets/ratings/rating-50.png";
import rating45 from "../assets/ratings/rating-45.png";
import rating40 from "../assets/ratings/rating-40.png";
import SecondaryButton from "./SecondaryButton";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
const ProductCard = ({ product }) => {
  const ratingImages = {
    4.0: rating40,
    4.5: rating45,
    5.0: rating50,
  };
  return (
    <motion.div
      key={product.id}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      {/* Product Image */}
      <div className="w-full h-64 sm:h-72 lg:h-80 overflow-hidden">
        <img
          src={product.images}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between ">
          {ratingImages[product.rating.stars] ? (
            <img
              src={ratingImages[product.rating.stars]}
              alt={`${product.rating.stars} stars`}
              className="w-20"
            />
          ) : (
            <span className="text-gray-500">No rating</span>
          )}
          <span className="text-sm text-gray-600">
            ({product.rating.count})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between my-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.priceCents / 100}
          </span>
          <SecondaryButton name="View" />
        </div>

        <div className="  ">
          <button className="px-6 flex items-center justify-center gap-4 relative w-full py-3 bg-(--color-foreground) text-(--color-surface) rounded-md border border-(--color-border) transition-all duration-300 hover:cursor-pointer opacity-90 hover:opacity-100 ">
            <span>
              <FaShoppingCart />
            </span>
            <span>Buy</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
