import React, { useEffect, useState } from "react";
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
import { apiFetch } from "../../utils/api";

const statusColors = {
  Shipping: "bg-blue-50 text-blue-700 border border-blue-200",
  Delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  Cancelled: "bg-red-50 text-red-600 border border-red-200",
};

const statusDot = {
  Shipping: "bg-blue-400",
  Delivered: "bg-emerald-400",
  Pending: "bg-amber-400",
  Cancelled: "bg-red-400",
};

const Dashboard = () => {
  const { loading, error, setSearchTerm, filteredOrders } = useOrders();

  const [overview, setOverview] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
  });
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchOverView = async () => {
      const res = await apiFetch("/analytics");

      setOverview({
        totalProducts: res.data.totalProducts,
        totalRevenue: res.data.totalRevenue,
        totalOrders: res.data.totalOrders,
        totalUsers: res.data.totalUsers,
      });

      setSalesData(res.data.salesOverview || []);
      setTopProducts(res.data.topProducts || []);
    };

    fetchOverView();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-100 rounded-2xl px-6 py-4 text-red-500 text-sm font-medium">
          {error}
        </div>
      </div>
    );

  const maxSales =
    topProducts.length > 0
      ? Math.max(...topProducts.map((p) => p.sales || 1))
      : 1;

  const overviewCards = [
    {
      id: 1,
      title: "Total Products",
      count: overview.totalProducts,
      icon: FaTshirt,
      bg: "bg-blue-50",
      iconColor: "text-blue-500",
      trend: "+12%",
      trendUp: true,
    },
    {
      id: 2,
      title: "Total Revenue",
      count: `$${Number(overview.totalRevenue).toLocaleString()}`,
      icon: FaMoneyBillWave,
      bg: "bg-amber-50",
      iconColor: "text-amber-500",
      trend: "+8.1%",
      trendUp: true,
    },
    {
      id: 3,
      title: "Total Orders",
      count: overview.totalOrders,
      icon: FaShoppingBag,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      trend: "+5.4%",
      trendUp: true,
    },
    {
      id: 4,
      title: "New Customers",
      count: overview.totalUsers,
      icon: FaUser,
      bg: "bg-purple-50",
      iconColor: "text-purple-500",
      trend: "-2.3%",
      trendUp: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminHeader title="Dashboard" />

      <main className="flex-1 p-6 flex flex-col gap-7">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center`}
                  >
                    <Icon className={`text-lg ${card.iconColor}`} />
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      card.trendUp
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {card.trend}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">
                    {card.count}
                  </p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {card.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Sales Chart — wider */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Sales Overview
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Last 7 days revenue
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                Revenue
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  vertical={false}
                />
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
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  }}
                  cursor={{ stroke: "#f3f4f6", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#f59e0b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products — narrower */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Top Products
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">By units sold</p>
            </div>
            <div className="flex flex-col gap-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.productId || index}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs font-bold text-gray-300 w-4 shrink-0">
                    {index + 1}
                  </span>
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                    <img
                      src={`http://localhost:3000/${product.images?.[0]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 truncate mb-1">
                      {product.name}
                    </p>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-700"
                        style={{
                          width: `${(product.sales / maxSales) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 shrink-0 tabular-nums">
                    {product.sales}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Recent Orders
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                {filteredOrders.length} orders found
              </p>
            </div>
            <div className="relative w-full sm:max-w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
              <input
                type="search"
                placeholder="Search by customer or ID…"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none bg-gray-50 text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-amber-100 focus:border-amber-300 transition"
              />
            </div>
          </div>

          {/* Table Header — desktop only */}
          <div className="hidden lg:grid grid-cols-4 gap-4 px-4 py-2 bg-gray-50 rounded-xl">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Order
            </p>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Customer
            </p>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Status
            </p>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider text-right">
              Total
            </p>
          </div>

          {/* Orders List */}
          <div className="flex flex-col gap-2">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4 items-center px-4 py-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/60 transition-all duration-150"
              >
                {/* Order ID */}
                <p className="text-sm font-semibold text-gray-800 font-mono tracking-tight">
                  #{order._id.slice(0, 8)}
                </p>

                {/* Customer */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      {order.userId.username?.[0]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium truncate">
                    {order.userId.username}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      statusColors[order.orderStatus.trim()] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        statusDot[order.orderStatus.trim()] || "bg-gray-400"
                      }`}
                    />
                    {order.orderStatus}
                  </span>
                </div>

                {/* Total */}
                <p className="text-sm font-bold text-gray-900 lg:text-right">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <FaShoppingBag className="text-gray-300 text-lg" />
              </div>
              <p className="text-sm text-gray-400 font-medium">
                No orders found
              </p>
              <p className="text-xs text-gray-300">Try adjusting your search</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
