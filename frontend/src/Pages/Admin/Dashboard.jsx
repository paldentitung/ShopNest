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
import MainButton from "../../Components/MainButton";
import SecondaryButton from "../../Components/SecondaryButton";
import AdminHeader from "../../Components/AdminHeader";
const Dashboard = () => {
  const overviewCards = [
    {
      id: 1,
      title: "Total Products",
      count: 320,
      icon: FaTshirt,
      color: "blue",
    },
    {
      id: 2,
      title: "Total Revenue",
      count: 32000,
      icon: FaShoppingBag,
      color: "orange",
    },
    {
      id: 3,
      title: "Total Orders",
      count: 90,
      icon: FaMoneyBillWave,
      color: "green",
    },
    {
      id: 4,
      title: "New Customers",
      count: 120,
      icon: FaUser,
      color: "gray",
    },
  ];

  const salesData = [
    { date: "2026-02-01", revenue: 2000 },
    { date: "2026-02-02", revenue: 1500 },
    { date: "2026-02-03", revenue: 1800 },
    { date: "2026-02-04", revenue: 2200 },
  ];

  const topProducts = [
    { name: "Blue T-Shirt", totalSold: 120 },
    { name: "Red Hoodie", totalSold: 85 },
    { name: "Black Jeans", totalSold: 70 },
    { name: "Sneakers", totalSold: 50 },
  ];

  const statusColors = {
    Shipping: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const recentOrders = [
    {
      id: "12345",
      customer: "John Doe",
      total: 120.0,
      status: "Shipping",
    },
    {
      id: "12346",
      customer: "Jane Smith",
      total: 250.0,
      status: "Delivered",
    },
    {
      id: "12347",
      customer: "Mike Johnson",
      total: 80.0,
      status: "Pending",
    },
    {
      id: "12348",
      customer: "Alice Brown",
      total: 150.0,
      status: "Cancelled",
    },
    {
      id: "12349",
      customer: "Chris Lee",
      total: 200.0,
      status: "Shipping",
    },
  ];

  return (
    <div className="flex flex-col ">
      <AdminHeader title="Dashboard" />

      <main className="bg-(--color-background) min-h-screen p-6">
        {/* overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
          {overviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="flex justify-center gap-3 items-center border border-(--color-border) p-5 rounded-md shadow bg-white min-h-32 max-h-40 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              >
                <div>
                  <Icon size={50} color={card.color} />
                </div>
                <div className="text-center">
                  <span>{card.title}</span>
                  <h3 className="text-lg md:text-3xl">{card.count}</h3>
                </div>
              </div>
            );
          })}
        </div>
        {/*  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-10">
          <div className="bg-white p-3 rounded-md shadow">
            <span className="p-3 font-semibold">Sales Overview</span>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF9800"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* top selling products */}
          <div className=" bg-white p-3 flex flex-col gap-5">
            <h4 className="font-semibold">Top Selling Products</h4>

            <div className="flex flex-col gap-3 border-b border-b-(--color-border) p-2">
              <div className="flex gap-6 ">
                <div className="h-16 w-16">
                  <img
                    src="/aboutus-image.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <span>1</span>,<span> Denim jacket</span>
                  </div>
                  <span>850 sales</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-b-(--color-border) p-2">
              <div className="flex gap-6  ">
                <div className="h-16 w-16">
                  <img
                    src="/aboutus-image.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center w-full ">
                  <div>
                    <span>1</span>,<span> Denim jacket</span>
                  </div>
                  <span>850 sales</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-b-(--color-border) p-2">
              <div className="flex gap-6  ">
                <div className="h-16 w-16">
                  <img
                    src="/aboutus-image.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center w-full ">
                  <div>
                    <span>1</span>,<span> Denim jacket</span>
                  </div>
                  <span>850 sales</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-5 bg-white p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h5 className="font-semibold">Recent Orders</h5>
            <div className="w-full max-w-110 relative">
              <input
                type="search"
                placeholder="search..."
                className="pl-8 pr-2  py-2 w-full outline-0 rounded-sm border border-(--color-border) transition-all duration-300 focus:ring  focus:ring-(--color-foreground)"
              />
              <FaSearch className=" absolute top-3 mx-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-gray-50/40"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Order ID
                    </div>
                    <div className="font-medium text-gray-900">{order.id}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Total
                    </div>
                    <div className="font-semibold text-emerald-600">
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Customer
                    </div>
                    <div className="font-medium text-gray-800">
                      {order.customer}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Status
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    View
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
