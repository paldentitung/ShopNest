// src/Context/SidebarContext.js
import { createContext, useState } from "react";

export const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <SideBarContext.Provider
      value={{ isExpanded, setIsExpanded, showSideBar, setShowSideBar }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
