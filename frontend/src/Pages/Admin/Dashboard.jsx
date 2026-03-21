import React from "react";
import {
  FaSearch,
  FaUser,
  FaTshirt,
  FaShoppingBag,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import AdminHeader from "./AdminHeader";
import { useOrders } from "../../Hooks/useOrders";

const overviewCards = [
  {
    id: 1,
    title: "Total Products",
    count: 320,
    icon: FaTshirt,
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    title: "Total Revenue",
    count: "$32,000",
    icon: FaMoneyBillWave,
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: 3,
    title: "Total Orders",
    count: 90,
    icon: FaShoppingBag,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    id: 4,
    title: "New Customers",
    count: 120,
    icon: FaUser,
    bg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

const salesData = [
  { date: "Feb 1", revenue: 2000 },
  { date: "Feb 2", revenue: 1500 },
  { date: "Feb 3", revenue: 1800 },
  { date: "Feb 4", revenue: 2200 },
];

const topProducts = [
  { rank: 1, name: "Denim Jacket", sales: 850 },
  { rank: 2, name: "Blue T-Shirt", sales: 120 },
  { rank: 3, name: "Red Hoodie", sales: 85 },
];

const statusColors = {
  Shipping: "bg-blue-50 text-blue-700 border border-blue-200",
  Delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  Cancelled: "bg-red-50 text-red-600 border border-red-200",
};

const Dashboard = () => {
  const { loading, error, setSearchTerm, filteredOrders } = useOrders();

  if (loading)
    return <p className="p-6 text-gray-400 text-sm">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-500 text-sm">{error}</p>;

  return (
    <div className="flex flex-col">
      <AdminHeader title="Dashboard" />

      <main className="bg-gray-50 min-h-screen p-6 flex flex-col gap-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`text-xl ${card.iconColor}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {card.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
                    {card.count}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-4">
              Sales Overview
            </h4>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart
                data={salesData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                  cursor={{ stroke: "#f3f4f6", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-gray-800">
              Top Selling Products
            </h4>
            <div className="flex flex-col gap-3">
              {topProducts.map((product) => (
                <div key={product.rank} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src="/aboutus-image.jpg"
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {product.name}
                    </p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${(product.sales / 850) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap shrink-0">
                    {product.sales} sold
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-gray-800">
              Recent Orders
            </h4>
            <div className="relative w-full sm:max-w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
              <input
                type="search"
                placeholder="Search orders…"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl outline-none bg-gray-50 text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-gray-200 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow duration-200 bg-gray-50/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                      Order
                    </p>
                    <p className="text-sm font-semibold text-gray-900 font-mono">
                      #{order._id.slice(0, 8)}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      statusColors[order.orderStatus.trim()] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                      Customer
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {order.userId.username}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                      Total
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
