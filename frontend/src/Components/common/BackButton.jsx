import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(-1)}
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.95 }}
      className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-gray-400 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <FaArrowLeft className="text-gray-400 group-hover:text-gray-900 transition-colors duration-200 text-sm" />
      <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors duration-200">
        Back
      </span>
    </motion.button>
  );
};

export default BackButton;
