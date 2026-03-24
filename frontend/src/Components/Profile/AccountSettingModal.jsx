import React from "react";
import { FaTimes } from "react-icons/fa";
import MainButton from "../MainButton";
import SecondaryButton from "../SecondaryButton";

const AccountSettingModal = ({ setShowAccountSettingModal }) => {
  return (
    <section className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className=" absolute inset-0 bg-black/40 z-40"
        onClick={() => setShowAccountSettingModal(false)}
      ></div>
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col space-y-6 z-50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            Account Settings
          </h3>
          <button
            onClick={() => setShowAccountSettingModal(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="border border-black/10"></div>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Current Password", "New Password", "Confirm Password"].map(
            (label, i) => (
              <div key={i} className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">{label}</label>
                <input
                  type="password"
                  placeholder="********"
                  className="border rounded-md  border-gray-300 p-2 outline-none transition focus:ring-2 focus:ring-offset-1 focus:ring-(--color-foreground)"
                />
              </div>
            ),
          )}
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-800">
              Notification Preferences
            </h3>

            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" className="mt-1" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    Email Notifications
                  </span>
                  <span className="text-xs text-gray-500">
                    Receive updates via email
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" className="mt-1" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    Push Notifications
                  </span>
                  <span className="text-xs text-gray-500">
                    Receive alerts on your device
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Privacy */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-800">Privacy Settings</h3>

            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" className="mt-1" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    Profile Visibility
                  </span>
                  <span className="text-xs text-gray-500">
                    Allow others to view your profile
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input type="checkbox" className="mt-1" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Order Visibility</span>
                  <span className="text-xs text-gray-500">
                    Show your order history publicly
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <SecondaryButton name="Cancel" />
          <MainButton name="Save" />
        </div>
      </div>
    </section>
  );
};

export default AccountSettingModal;
