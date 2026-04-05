import { useState, useEffect } from "react";
import { getOrders } from "../Services/ordersApi";
import { apiFetch } from "../utils/api";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [myorders, setMyorders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getOrders(page, 10);

        const ordersArray = res?.data?.data || [];
        setOrders(
          ordersArray.map((o) => ({
            ...o,
            orderStatus: o.orderStatus.trim(),
          })),
        );

        setPages(res?.data?.pages || 1);
      } catch (err) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  const filteredOrders = orders.filter(
    (order) =>
      order.userId?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || order.orderStatus === statusFilter),
  );

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
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
    } catch (err) {
      console.error("Failed to update order status:", err.message);
    }
  };

  useEffect(() => {
    const fetchMyOrder = async () => {
      try {
        const res = await apiFetch("/orders/myorder");

        const ordersArray = res?.data?.data || [];

        setMyorders(
          ordersArray.map((o) => ({
            ...o,
            orderStatus: o.orderStatus?.trim() || "",
          })),
        );
      } catch (err) {
        console.error("Failed to fetch my orders:", err.message);
      }
    };

    fetchMyOrder();
  }, []);

  const myInProgressOrders = myorders.filter(
    (order) => order.orderStatus === "pending",
  );

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
    page,
    setPage,
    pages,
    setPages,
    myInProgressOrders,
  };
};
