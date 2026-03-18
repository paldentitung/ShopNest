import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { getOrders } from "../../Services/ordersApi";
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders();
      console.log("order", res);
      setOrders(res);
    };
    fetchOrders();
  }, []);

  const userToken = localStorage.getItem("ShopNext-token");

  const handleStatusChange = async (orderId, newStatus) => {
    try {
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

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const updatedOrder = await res.json();

      setOrders((prev) =>
        prev.map((o) =>
          o._id === updatedOrder._id
            ? { ...o, orderStatus: updatedOrder.orderStatus }
            : o,
        ),
      );

      console.log(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order:", error.message);
      alert("Failed to update order status");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.userId?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || order.orderStatus === statusFilter),
  );
  return (
    <div className="w-full">
      <AdminHeader title="Order Management" />

      <div className="w-full max-w-7xl mx-auto mt-6 bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
        w-full pl-11 pr-4 py-2.5 
        bg-gray-50 border border-gray-300 
        rounded-lg text-gray-900 
        placeholder-gray-500 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-all duration-200 shadow-sm
      `}
              placeholder="Search products by name, category..."
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-(--color-border) w-full max-w-50 px-3 py-1 rounded-md shadow transition-all duration-300 outline-0 cursor-pointer"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="placed">Placed</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer Name</th>
              <th className="px-6 py-4">Total Amount</th>
              <th className="px-6 py-4">Payment Status</th>
              <th className="px-6 py-4">Order Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {order._id}
                  </td>
                  <td className="px-6 py-4">{order.userId.username}</td>
                  <td className="px-6 py-4">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="border border-(--color-border) px-3 py-1 rounded-md shadow transition-all duration-300 outline-0 cursor-pointer"
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="placed">Placed</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
