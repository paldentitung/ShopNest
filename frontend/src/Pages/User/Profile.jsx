import React from "react";
import {
  FaEdit,
  FaCog,
  FaUserPlus,
  FaSignOutAlt,
  FaShoppingCart,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaStar,
  FaTicketAlt,
  FaGift,
  FaEnvelope,
} from "react-icons/fa";
const Profile = () => {
  return (
    <section className="mt-10 bg-gray-100 p-6 flex flex-col gap-5 w-full max-w-7xl mx-auto ">
      <div className="bg-white flex gap-2 p-6 rounded-md  shadow">
        <div className="w-20 h-20  overflow-hidden flex justify-center items-center ">
          <img
            src="../hero-image-3.jpg"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h2 className="text-lg md:text-2xl font-semibold">Alex Chen</h2>
          <span className="text-gray-600">@alexchen</span>
          <p className="text-gray-600">
            Welcome back, Alex! You have 3 orders in progress and 2 items in
            your wishlist.
          </p>
        </div>
      </div>

      <div className="flex gap-5">
        <button className="flex items-center gap-2">
          <FaEdit /> Edit
        </button>
        <button className="flex items-center gap-2">
          <FaCog /> Settings
        </button>
        <button className="flex items-center gap-2">
          <FaUserPlus /> Follow
        </button>
        <button className="flex items-center gap-2">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div>
        <ul className="flex gap-7">
          <li>Overview</li>
          <li>Orders</li>
          <li>Payment & addresses</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="flex flex-col gap-8 col-span-1  md:col-span-2">
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
          <div className="bg-white p-6 shadow-md rounded-md">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold  md:text-lg">Wishlist</span>
              <span>4 items</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-8">
              <div className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative">
                <div className="overflow-hidden h-65">
                  <img
                    src="../hero-image-1.jpg"
                    alt=""
                    className="transition-all duration-300 group-hover:scale-110 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-sm px-2 py-4">
                  <span>Classic White Sneakers</span>
                  <span>$129.00</span>
                </div>

                <div className=" hidden group-hover:block  absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full">
                  <FaShoppingCart color="white" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative">
                <div className="overflow-hidden h-65">
                  <img
                    src="../hero-image-1.jpg"
                    alt=""
                    className="transition-all duration-300 group-hover:scale-110 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-sm px-2 py-4">
                  <span>Classic White Sneakers</span>
                  <span>$129.00</span>
                </div>

                <div className=" hidden group-hover:block  absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full">
                  <FaShoppingCart color="white" size={20} />
                </div>
              </div>{" "}
              <div className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative">
                <div className="overflow-hidden h-65">
                  <img
                    src="../hero-image-1.jpg"
                    alt=""
                    className="transition-all duration-300 group-hover:scale-110 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-sm px-2 py-4">
                  <span>Classic White Sneakers</span>
                  <span>$129.00</span>
                </div>

                <div className=" hidden group-hover:block  absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full">
                  <FaShoppingCart color="white" size={20} />
                </div>
              </div>{" "}
              <div className="flex flex-col gap-2 shadow overflow-hidden rounded-md group transition-all duration-300 hover:cursor-pointer relative">
                <div className="overflow-hidden h-65">
                  <img
                    src="../hero-image-1.jpg"
                    alt=""
                    className="transition-all duration-300 group-hover:scale-110 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col text-sm px-2 py-4">
                  <span>Classic White Sneakers</span>
                  <span>$129.00</span>
                </div>

                <div className=" hidden group-hover:block  absolute bottom-1/4 right-2 p-2 bg-amber-600 rounded-full">
                  <FaShoppingCart color="white" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="bg-white p-6 text-sm rounded-md shadow-md">
            <div className="font-semibold  md:text-lg">Account OVerview</div>
            <div className="flex flex-col gap-3 p-2">
              <div className="flex items-center gap-2">
                <div>
                  <FaEnvelope />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">EMAIL</span>
                  <span>alexchen@gmail.com</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <FaPhoneAlt />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">PHONE</span>
                  <span>+1 234 567 890</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <FaMapMarkerAlt />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">ADDRESS</span>
                  <span>123 Main Street, New York, NY</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 flex flex-col gap-4 shadow-md rounded-md">
            <div className="font-semibold  md:text-lg">Rewards & Loyalty</div>

            <div className="flex items-center gap-2 bg-orange-100 p-2 rounded-md shadow">
              <div className="bg-amber-500 p-3 rounded-full">
                <FaStar color="white" />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">2,480</span>
                  <span className="text-sm text-gray-500">Loyality Points</span>
                </div>
                <div className="text-sm text-orange-500">Redeem</div>
              </div>
            </div>

            <div className="flex items-center gap-2  p-2 rounded-md shadow">
              <div className=" p-3 rounded-full">
                <FaTicketAlt color="gray" size={18} />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm">15% OFF</span>
                  <span className="text-xs text-gray-500">
                    Valid until Mar 31, 2026
                  </span>
                </div>
                <div className="text-sm bg-green-100 p-2 rounded-full text-green-700">
                  Active
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2  p-2 rounded-md shadow">
              <div className=" p-3 ">
                <FaGift color="" size={18} />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm">Free Shipping</span>
                  <span className="text-xs text-gray-500">Loyality Points</span>
                </div>
                <div className="text-sm bg-green-100 p-2 rounded-full text-green-700">
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
