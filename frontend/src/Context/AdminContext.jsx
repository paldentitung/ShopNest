// AdminContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);

    const userData = JSON.parse(localStorage.getItem("ShopNest-user") || "{}");

    if (userData.role !== "admin") {
      setLoading(false);
      return;
    }

    try {
      const data = await apiFetch("/user/all", { method: "GET" });
      setUsers(data || []);
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
