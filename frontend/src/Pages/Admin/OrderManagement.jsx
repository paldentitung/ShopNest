import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import { getOrders } from "../../Services/ordersApi";
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders();
      console.log("order", res);
      setOrders(res);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderStatus: newStatus }),
        },
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const updatedOrder = await res.json();

      // Update local state
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
      );

      console.log(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order:", error.message);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="w-full">
      <AdminHeader title="Order Management" />

      <div className="w-full max-w-7xl mx-auto mt-6 bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
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
            {orders.map((order) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
