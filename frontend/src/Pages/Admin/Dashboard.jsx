import React from "react";
import {
  FaSearch,
  FaUser,
  FaTshirt,
  FaShoppingBag,
  FaMoneyBillWave,
} from "react-icons/fa";
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

  return (
    <div>
      <header className="flex justify-between items-center p-6 w-full">
        <div className="w-full max-w-110 relative">
          <input
            type="search"
            placeholder="search..."
            className="px-8  py-2 w-full outline-0 rounded-sm border border-(--color-border) transition-all duration-300 focus:ring  focus:ring-(--color-foreground)"
          />
          <FaSearch className=" absolute top-3 mx-2" />
        </div>
        <div>
          <FaUser />
        </div>
      </header>

      <main className="bg-(--color-background) min-h-screen p-6">
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
      </main>
    </div>
  );
};

export default Dashboard;
