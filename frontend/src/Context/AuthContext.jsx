import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("ShopNest-token"),
  );
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("ShopNest-user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("ShopNest-user");
    const storedToken = localStorage.getItem("ShopNest-token");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (token, user) => {
    localStorage.setItem("ShopNest-token", token);
    localStorage.setItem("ShopNest-user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem("ShopNest-token");
    localStorage.removeItem("ShopNest-user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
