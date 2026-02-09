import React from "react";
import AdminHeader from "../../Components/AdminHeader";
const OrderManagement = () => {
  const orders = [
    {
      id: "102002",
      customer: "John Doe",
      total: 299.99,
      payment: "Paid",
      status: "Pending",
    },
    {
      id: "102003",
      customer: "Jane Smith",
      total: 149.99,
      payment: "Pending",
      status: "Shipped",
    },
  ];
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
              <tr key={order.id}>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {order.id}
                </td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">${order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.status === "Pending"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {order.status}
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
