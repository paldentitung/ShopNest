import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaCog, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../Hooks/useAuth";
import OrderHistory from "../../Components/Profile/OrderHistory";
import Wishlist from "../../Components/Profile/Wishlist";
import AccountOverview from "../../Components/Profile/AccountOverview";
import { AuthContext } from "../../Context/AuthContext";
import AccountSettingModal from "../../Components/Profile/AccountSettingModal";
import EditProfileModal from "../../Components/Profile/EditProfileModal";

const Profile = () => {
  const { logoutUser } = useAuth();
  const [tab, setTab] = useState("overview");
  const [showAction, setShowAction] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAccountSettingModal, setShowAccountSettingModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);
  return (
    <>
      <section className="bg-gray-100 min-h-screen py-5 md:p-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-3">
          <div className="flex flex-col transition-all duration-500">
            <div className="bg-white p-4 sm:p-6 shadow-sm  flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center justify-between md:justify-start w-full md:w-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border shrink-0">
                    <div
                      onClick={() => setShowAvatarPreview(true)}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border shrink-0 cursor-pointer hover:opacity-80 transition"
                    >
                      <img
                        src={user?.avatar || "/hero-image-3.jpg"}
                        alt={user?.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowAction(!showAction)}
                  className="block md:hidden"
                >
                  <FaCog />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                  {user.username}
                </h2>

                <span className="text-gray-500 text-xs sm:text-sm">
                  @{user.username}
                </span>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  Welcome back, {user.username.split(" ")[0]}! You have 3 orders
                  in progress and 2 items in your wishlist.
                </p>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out
              ${showAction ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
              md:max-h-full md:opacity-100
            `}
            >
              <div className="flex flex-wrap gap-3 bg-white px-5 pb-5 pt-1">
                <button
                  onClick={() => setShowEditProfileModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => setShowAccountSettingModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
                >
                  <FaCog />
                  Settings
                </button>

                <button
                  onClick={logoutUser}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <ul className="flex gap-2 overflow-x-auto p-2 ">
                {[
                  { label: "Overview", value: "overview" },
                  { label: "Orders", value: "orderhistory" },
                  { label: "Wishlist", value: "wishlist" },
                  { label: "Account", value: "accontoverview" },
                ].map((item) => (
                  <li
                    key={item.value}
                    onClick={() => setTab(item.value)}
                    className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg cursor-pointer transition-all hover:bg-gray-200 
                  ${
                    tab === item.value
                      ? "bg-(--color-foreground) text-white shadow"
                      : "text-gray-600 "
                  }`}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="transition-all duration-300">
              {tab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 flex flex-col gap-6">
                    <OrderHistory />
                    <Wishlist />
                  </div>

                  <div className="flex flex-col gap-6">
                    <AccountOverview />
                  </div>
                </div>
              )}

              {tab === "orderhistory" && <OrderHistory />}

              {tab === "wishlist" && <Wishlist />}

              {tab === "accontoverview" && <AccountOverview />}
            </div>
          </div>
        </div>
      </section>

      {showAccountSettingModal && (
        <AccountSettingModal
          setShowAccountSettingModal={setShowAccountSettingModal}
        />
      )}
      {showEditProfileModal && (
        <EditProfileModal
          setShowEditProfileModal={setShowEditProfileModal}
          user={user}
        />
      )}
      {showAvatarPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowAvatarPreview(false)}
        >
          <img
            src={user?.avatar || "/hero-image-3.jpg"}
            alt={user?.username}
            className="w-72 h-72 rounded-full object-cover ring-4 ring-white shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

export default Profile;
