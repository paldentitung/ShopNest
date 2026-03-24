import { FaCog } from "react-icons/fa";
const OrderHistory = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <span className="font-semibold  md:text-lg">Order History</span>
        <button>View All</button>
      </div>

      <ul className="flex flex-col gap-3 p-3 ">
        <li className="flex gap-1 items-center">
          <div className="bg-gray-300 p-2 rounded-md shadow">
            <FaCog />
          </div>
          <div className="flex-1 flex items-center justify-between text-sm">
            <div className="flex flex-col ">
              <span>Order ID</span>
              <span>Order Data</span>
            </div>
            <div>$8888</div>
          </div>
        </li>

        <li className="flex gap-1 items-center">
          <div className="bg-gray-300 p-2 rounded-md shadow">
            <FaCog />
          </div>
          <div className="flex-1 flex items-center justify-between text-sm">
            <div className="flex flex-col ">
              <span>Order ID</span>
              <span>Order Data</span>
            </div>
            <div>$8888</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OrderHistory;
