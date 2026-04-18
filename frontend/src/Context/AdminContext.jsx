// AdminContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../utils/api";
import toast from "react-hot-toast";

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
      const res = await apiFetch("/user/all", { method: "GET" });
      setUsers(res.data || []);
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

  const unblockUser = async (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, status: "active" } : u)),
    );

    try {
      const res = await apiFetch(`/user/unblock/${userId}`, {
        method: "PATCH",
      });

      toast.success(res.message || "User unblocked");
    } catch (err) {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, status: "blocked" } : u)),
      );

      toast.error(err.message || "Failed to unblock user");
    }
  };

  const blockUser = async (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, status: "blocked" } : u)),
    );

    try {
      const res = await apiFetch(`/user/block/${userId}`, {
        method: "PATCH",
      });

      toast.success(res.message || "User blocked");
    } catch (err) {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, status: "active" } : u)),
      );

      toast.error(err.message || "Failed to block user");
    }
  };
  return (
    <AdminContext.Provider
      value={{ users, loading, fetchUsers, blockUser, unblockUser }}
    >
      {children}
    </AdminContext.Provider>
  );
};
