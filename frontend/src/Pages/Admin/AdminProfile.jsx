import React from "react";
import AdminHeader from "./AdminHeader";
import { FaEdit, FaKey, FaSignOutAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";
import { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import MainButton from "../../Components/MainButton";
import { changePassword } from "../../Services/authApi";

const AdminProfile = () => {
  // These would come from auth context / state in real app
  const admin = {
    name: "Nami",
    email: "nami@gmail.com",
    avatar: "/hero-image-1.jpg", // or use a placeholder like https://ui-avatars.com/api/?name=Nami
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
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Admin Profile" />

      <div className=" w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
          {/* Profile Header / Card */}
          <div className="p-6 sm:p-8 border-b border-gray-200 bg-linear-to-r from-indigo-50 to-blue-50">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={admin.avatar}
                    alt="Admin profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition">
                  <FaEdit size={16} />
                </button>
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {admin.name}
                </h2>
                <p className="text-gray-600 mt-1">{admin.email}</p>
                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                  <button className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-medium">
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                    }}
                    className="inline-flex items-center px-5 py-2.5 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition font-medium"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Forms */}
          <div className="p-6 sm:p-8 space-y-10">
            {/* Admin Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <FaUser className="text-indigo-600" />
                Admin Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={admin.name}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={admin.email}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                  Save Changes
                </button>
              </div>
            </section>

            <div className="px-7 py-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["currentPassword", "newPassword", "confirmPassword"].map(
                  (field, idx) => {
                    const labels = [
                      "Current Password",
                      "New Password",
                      "Confirm Password",
                    ];
                    return (
                      <div
                        className="flex flex-col gap-1.5 relative"
                        key={field}
                      >
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
              <MainButton name="Save" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
