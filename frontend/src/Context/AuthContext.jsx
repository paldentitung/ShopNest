import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("ShopNext-token");
    const storedUser = localStorage.getItem("ShopNext-user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const loginUser = (token, user) => {
    localStorage.setItem("ShopNext-token", token);
    localStorage.setItem("ShopNext-user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem("ShopNext-token");
    localStorage.removeItem("ShopNext-user");

    setToken(null);
    setUser(null);

    toast.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("ShopNext-token");
    const user = JSON.parse(localStorage.getItem("ShopNext-user"));

    if (token && user) {
      setToken(token);
      setUser(user);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ token, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
