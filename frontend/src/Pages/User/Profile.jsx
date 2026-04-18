import React, { useContext, useState } from "react";
import { FaEdit, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../Hooks/useAuth";
import OrderHistory from "../../Components/Profile/OrderHistory";
import Wishlist from "../../Components/Profile/Wishlist";
import AccountOverview from "../../Components/Profile/AccountOverview";
import { AuthContext } from "../../Context/AuthContext";
import AccountSettingModal from "../../Components/Profile/AccountSettingModal";
import EditProfileModal from "../../Components/Profile/EditProfileModal";
import MainButton from "../../Components/common/MainButton";
import SecondaryButton from "../../Components/common/SecondaryButton";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { useApp } from "../../Hooks/useApp";
import { useOrders } from "../../Hooks/useOrders";
import PurchaseHistory from "../../Components/Profile/PurchaseHistory";
const Profile = () => {
  const { logoutUser } = useAuth();
  const [tab, setTab] = useState("overview");
  const [showAction, setShowAction] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAccountSettingModal, setShowAccountSettingModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const { wishlist } = useApp();

  const { myInProgressOrders } = useOrders();
  return (
    <>
      <section className="bg-gray-100 min-h-screen py-5 md:p-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-3">
          <div className="flex flex-col transition-all duration-500">
            <div className="bg-white p-4 sm:p-6 shadow-sm  flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center justify-between md:justify-start w-full md:w-auto">
                <div
                  onClick={() => setShowAvatarPreview(true)}
                  className="w-14 h-14  sm:w-16 sm:h-16  md:w-20 md:h-20 rounded-full  overflow-hidden  shadow  shrink-0 cursor-pointer transition  hover:opacity-80
                    "
                >
                  <img
                    src={user?.avatar || "/hero-image-3.jpg"}
                    alt={user?.username || "User avatar"}
                    className="w-full h-full object-cover"
                  />
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
                  Welcome back, {user.username.split(" ")[0]}! You have{" "}
                  {myInProgressOrders.length} orders in progress and{" "}
                  {wishlist.length} items in your wishlist.
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
                  // onClick={logoutUser}
                  onClick={handleLogout}
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
                  { label: "Purchase History", value: "purchasehistory" },
                ].map((item) => (
                  <li
                    key={item.value}
                    onClick={() => setTab(item.value)}
                    className={`
                      px-4 py-2 text-sm whitespace-nowrap rounded-lg cursor-pointer
                      transition-all duration-300 ease-in-out
                      ${
                        tab === item.value
                          ? "bg-(--color-foreground) text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100 hover:scale-105 hover:shadow-md"
                      }
                    `}
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
                    <OrderHistory isShow={false} />
                    <Wishlist />
                  </div>

                  <div className="flex flex-col gap-6">
                    <AccountOverview />
                    <PurchaseHistory showAll={false} />
                  </div>
                </div>
              )}

              {tab === "orderhistory" && <OrderHistory />}

              {tab === "wishlist" && <Wishlist />}

              {tab === "accontoverview" && <AccountOverview />}

              {tab === "purchasehistory" && <PurchaseHistory showAll={true} />}
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

      {showModal && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative z-50 w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 border border-red-100">
              <FiLogOut className="h-6 w-6 text-red-500" />
            </div>

            {/* Text */}
            <h2 className="mb-1 text-lg font-semibold text-neutral-900">
              Sign out?
            </h2>
            <p className="mb-6 text-sm text-neutral-400">
              You'll be logged out of your account. You can sign back in
              anytime.
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-3">
              <SecondaryButton
                name="Cancel"
                onClick={() => setShowModal(false)}
                className="flex-1"
              />
              <MainButton
                name="Sign out"
                onClick={() => {
                  toast.success("Logged out successfully");
                  logoutUser();
                }}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
