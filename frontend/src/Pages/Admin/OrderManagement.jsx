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
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.orderStatus === "pending"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
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
