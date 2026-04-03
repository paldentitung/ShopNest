import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa"; // nicer icon for orders
import { apiFetch } from "../../utils/api";

const OrderHistory = ({ isShow = true }) => {
  const [myorders, setMyorders] = useState([]);

  useEffect(() => {
    const fetchMyorders = async () => {
      try {
        const res = await apiFetch("/orders/myorder");
        if (res) setMyorders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchMyorders();
  }, []);

  const ordersToDisplay = isShow ? myorders : myorders.slice(0, 2);

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-100">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          Order History
        </h2>
      </div>

      <ul className="flex flex-col gap-4">
        {ordersToDisplay.length > 0 ? (
          ordersToDisplay.map((o) => (
            <li
              key={o._id}
              className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="shrink-0 bg-blue-50 p-3 rounded-full">
                <FaBoxOpen size={20} />
              </div>
              <div className="flex-1 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 md:gap-0">
                <div>
                  <p className="text-gray-700 font-medium">
                    Order ID:{" "}
                    <span className="font-normal">{o._id.slice(0, 8)}</span>
                  </p>
                  <p className="text-gray-500 text-sm capitalize">
                    Status: {o.orderStatus}
                  </p>
                </div>
                <div className="text-gray-800 font-semibold text-sm md:text-base">
                  ${o.totalAmount.toFixed(2)}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No orders yet.</p>
        )}
      </ul>
    </div>
  );
};

export default OrderHistory;
