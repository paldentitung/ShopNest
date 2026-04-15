import React from "react";
import AdminHeader from "./AdminHeader";
import {
  FaEdit,
  FaSignOutAlt,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";
import { useState } from "react";
import MainButton from "../../Components/common/MainButton";
import { changePassword } from "../../Services/authApi";
import ConfirmModal from "../../Components/ConfirmModal";

const AdminProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const admin = {
    name: "Nami",
    email: "nami@gmail.com",
    avatar: "/hero-image-1.jpg",
  };

  const { logoutUser } = useAuth();
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
      const res = await changePassword({ currentPassword, newPassword });
      if (res.success) {
        toast.success("Password changed successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(res.message || "Current password is incorrect");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const passwordFields = [
    { key: "currentPassword", label: "Current Password" },
    { key: "newPassword", label: "New Password" },
    { key: "confirmPassword", label: "Confirm Password" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader title="Admin Profile" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-8 py-7 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-100">
              <div className="relative shrink-0">
                <img
                  src={admin.avatar}
                  alt="Admin profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-indigo-700 transition">
                  <FaEdit size={11} />
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-900">
                  {admin.name}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">{admin.email}</p>
                <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Administrator
                </span>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition">
                    <FaEdit size={12} />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition"
                  >
                    <FaSignOutAlt size={12} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            <div className="px-8 py-7 border-b border-gray-100">
              <h3 className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
                <FaUser size={12} />
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={admin.name}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={admin.email}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-5">
                <div>
                  <MainButton name="Save changes" />
                </div>
              </div>
            </div>

            <div className="px-8 py-7">
              <h3 className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
                <FaLock size={12} />
                Change Password
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {passwordFields.map(({ key, label }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-500">
                      {label}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword[key] ? "text" : "password"}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 pr-9 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
                      />
                      <button
                        type="button"
                        onClick={() => toggleShow(key)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword[key] ? (
                          <FaEyeSlash size={14} />
                        ) : (
                          <FaEye size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-5">
                <MainButton name="Update Password" onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Sign out"
        message="Are you sure you want to signout"
        confirmText="signout"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={() => {
          logoutUser();
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default AdminProfile;
