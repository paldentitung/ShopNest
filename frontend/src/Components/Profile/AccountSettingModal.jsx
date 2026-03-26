import { React, useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import MainButton from "../MainButton";
import SecondaryButton from "../SecondaryButton";
import { changePassword } from "../../Services/authApi";
import { toast } from "react-hot-toast";

const AccountSettingModal = ({ setShowAccountSettingModal }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for showing/hiding passwords
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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
    <section className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/40 z-40"
        onClick={() => setShowAccountSettingModal(false)}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col space-y-6 z-50"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            Account Settings
          </h3>
          <button
            type="button"
            onClick={() => setShowAccountSettingModal(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="border border-black/10"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["currentPassword", "newPassword", "confirmPassword"].map(
            (field, idx) => {
              const labels = [
                "Current Password",
                "New Password",
                "Confirm Password",
              ];
              return (
                <div className="flex flex-col gap-2 relative" key={field}>
                  <label className="text-sm text-gray-600">{labels[idx]}</label>
                  <input
                    type={showPassword[field] ? "text" : "password"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder="********"
                    className="border rounded-md border-gray-300 p-2 pr-10 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-(--color-foreground)"
                  />
                  <span
                    onClick={() => toggleShow(field)}
                    className="absolute right-2 top-9 cursor-pointer text-gray-500"
                  >
                    {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              );
            },
          )}
        </div>

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
          <MainButton name="Save" type="submit" />
        </div>
      </form>
    </section>
  );
};

export default AccountSettingModal;
