import { useNavigate } from "react-router-dom";
import MainButton from "./MainButton";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
const ProductListing = ({ products, isHidden = false }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 flex flex-col gap-8">
      {/* Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800">
        Products
      </h2>

      {/* Grid */}
      <div className="w-full max-w-360 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(products || []).map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center">
        {isHidden && (
          <MainButton name="Show More" onClick={() => navigate("/products")} />
        )}
      </div>
    </div>
  );
};

export default ProductListing;
