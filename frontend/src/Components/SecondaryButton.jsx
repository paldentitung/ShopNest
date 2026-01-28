import React from "react";

const SecondaryButton = ({ name, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="px-6 py-3 bg-(--color-surface) text-(--color-foreground) rounded-md border border-(--color-border) transition-all duration-300 hover:cursor-pointer hover:bg-(--color-foreground) hover:text-(--color-surface) "
    >
      {name}
    </button>
  );
};

export default SecondaryButton;
