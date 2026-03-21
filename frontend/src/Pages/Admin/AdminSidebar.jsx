import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaEnvelope,
  FaUserCircle,
  FaAngleLeft,
  FaAngleRight,
  FaTimes,
} from "react-icons/fa";
import { SideBarContext } from "../../Context/SideBarContext";

const navItems = [
  { id: 1, name: "Dashboard", icon: FaHome, link: "/admin" },
  { id: 2, name: "Products", icon: FaBox, link: "/admin/productmanagement" },
  {
    id: 3,
    name: "Orders",
    icon: FaClipboardList,
    link: "/admin/ordermanagement",
  },
  { id: 4, name: "Users", icon: FaUsers, link: "/admin/usermanagement" },
  {
    id: 5,
    name: "Contacts",
    icon: FaEnvelope,
    link: "/admin/contactmanagement",
  },
  { id: 6, name: "Profile", icon: FaUserCircle, link: "/admin/profile" },
];

const AdminSidebar = ({ mobile }) => {
  const { isExpanded, setIsExpanded, showSideBar, setShowSideBar } =
    useContext(SideBarContext);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out z-40
        ${isExpanded ? "w-70" : "w-18"}
        ${mobile ? (showSideBar ? "flex" : "hidden") : "flex md:flex"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-white/10 overflow-hidden min-h-20">
        <div className="w-8 h-8 rounded-lg bg-amber-400 italic text-black flex items-center justify-center shrink-0">
          SN
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
          }`}
        >
          <h1 className="text-base font-extrabold tracking-tight whitespace-nowrap">
            Shop<span className="text-amber-400">Nest</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">
            Admin Panel
          </p>
        </div>

        {mobile && showSideBar && (
          <button
            onClick={() => setShowSideBar(false)}
            className="ml-auto w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition shrink-0"
          >
            <FaTimes size={13} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="relative group/nav">
                <NavLink
                  to={item.link}
                  onClick={() => mobile && setShowSideBar(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      isExpanded ? "" : "justify-center"
                    } ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isExpanded && (
                        <span
                          className={`w-1 h-5 rounded-full shrink-0 transition-all duration-200 ${
                            isActive ? "bg-amber-400" : "bg-transparent"
                          }`}
                        />
                      )}
                      <Icon
                        size={18}
                        className={`shrink-0 transition-colors duration-200 ${
                          isActive
                            ? "text-amber-400"
                            : "text-gray-500 group-hover/nav:text-white"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? "opacity-100 w-auto"
                            : "opacity-0 w-0 overflow-hidden"
                        }`}
                      >
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>

                {/* Tooltip when collapsed */}
                {!isExpanded && (
                  <div className="pointer-events-none fixed ml-18 -translate-y-[calc(50%+18px)] z-[200] opacity-0 group-hover/nav:opacity-100 transition-opacity duration-150">
                    <div className="relative bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                      {item.name}
                      <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
        >
          {isExpanded ? <FaAngleLeft size={16} /> : <FaAngleRight size={16} />}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
