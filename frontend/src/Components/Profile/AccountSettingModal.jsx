import React, { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import MainButton from "../common/MainButton";
import SecondaryButton from "../common/SecondaryButton";
import { changePassword } from "../../Services/authApi";
import { toast } from "react-hot-toast";

const AccountSettingModal = ({ setShowAccountSettingModal }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      await changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowAccountSettingModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      // Modal wrapper — bottom sheet on mobile, centered on sm+
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
        {/* Overlay — unchanged */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAccountSettingModal(false)}
        />

        {/* Form/card — sheet on mobile, card on sm+ */}
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full sm:max-w-3xl bg-white  shadow-2xl overflow-hidden flex flex-col z-50 max-h-[92dvh] overflow-y-auto m-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">
              Account Settings
            </h3>
            <button
              type="button"
              onClick={() => setShowAccountSettingModal(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition"
            >
              <FaTimes size={13} />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-5 sm:px-7 sm:py-6 flex flex-col gap-5 sm:gap-6">
            {/* Password fields — stacked on mobile, 3-col on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {["currentPassword", "newPassword", "confirmPassword"].map(
                (field, idx) => {
                  const labels = [
                    "Current Password",
                    "New Password",
                    "Confirm Password",
                  ];
                  return (
                    <div className="flex flex-col gap-1.5 relative" key={field}>
                      <label className="text-xs font-semibold text-gray-500">
                        {labels[idx]}
                      </label>
                      <input
                        type={showPassword[field] ? "text" : "password"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder="********"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
                      />
                      <span
                        onClick={() => toggleShow(field)}
                        className="absolute right-3 top-9 cursor-pointer text-gray-500"
                      >
                        {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2.5 px-4 sm:px-7 py-4 border-t border-gray-100 bg-gray-50/50">
            <SecondaryButton
              type="button"
              name="Cancel"
              onClick={() => setShowAccountSettingModal(false)}
            />
            <MainButton name="Save Changes" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountSettingModal;
