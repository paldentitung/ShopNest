import React from "react";

const MainButton = ({ name, onClick, type }) => {
  return (
    <button className="px-6 py-3 bg-(--color-foreground) text-white rounded-md shadow-md opacity-90 hover:opacity-100 transition-all duration-300 hover:cursor-pointer ">
      {name}
    </button>
  );
};

export default MainButton;
