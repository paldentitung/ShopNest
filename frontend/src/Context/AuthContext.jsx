// AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("ShopNext-token"),
  );
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("ShopNext-user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("ShopNext-user");
    const storedToken = localStorage.getItem("ShopNext-token");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
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
  };

  return (
    <AuthContext.Provider value={{ token, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
