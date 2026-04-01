// src/hooks/useOrders.js
import { useState, useEffect } from "react";
import { getOrders } from "../Services/ordersApi";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getOrders();
        setOrders(
          res.data.map((o) => ({ ...o, orderStatus: o.orderStatus.trim() })),
        );
      } catch (err) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.userId?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || order.orderStatus === statusFilter),
  );

  const updateOrderStatus = async (orderId, newStatus) => {
    const userToken = localStorage.getItem("ShopNest-token");
    const res = await fetch(
      `http://localhost:3000/api/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      },
    );
    if (!res.ok) throw new Error(await res.text());
    const updatedOrderRes = await res.json();
    const updatedOrder = updatedOrderRes.data;
    setOrders((prev) =>
      prev.map((o) =>
        o._id === updatedOrder._id
          ? { ...o, orderStatus: updatedOrder.orderStatus.trim() }
          : o,
      ),
    );
  };

  return {
    orders,
    loading,
    error,
    updateOrderStatus,
    setOrders,
    setSearchTerm,
    searchTerm,
    filteredOrders,
    statusFilter,
    setStatusFilter,
  };
};
