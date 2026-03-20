// AdminContext.js
import { createContext, useContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("ShopNext-token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/api/user", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("ShopNest-token");
    if (!userToken) return;
    fetchUsers();
  }, []);

  return (
    <AdminContext.Provider value={{ users, loading, fetchUsers }}>
      {children}
    </AdminContext.Provider>
  );
};
