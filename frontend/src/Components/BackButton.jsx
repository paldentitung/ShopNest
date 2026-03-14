import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center  gap-2 px-3 py-1 border rounded-md cursor-pointer"
    >
      <FaArrowLeft size={20} />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
};

export default BackButton;
