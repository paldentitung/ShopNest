import React from "react";
import AdminHeader from "../../Components/AdminHeader";
import { FaEdit, FaKey, FaSignOutAlt, FaUser } from "react-icons/fa";

const AdminProfile = () => {
  // These would come from auth context / state in real app
  const admin = {
    name: "Nami",
    email: "nami@gmail.com",
    avatar: "/hero-image-1.jpg", // or use a placeholder like https://ui-avatars.com/api/?name=Nami
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
                  <button className="inline-flex items-center px-5 py-2.5 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition font-medium">
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

            {/* Change Password */}
            <section className="pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <FaKey className="text-indigo-600" />
                Change Password
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                  Update Password
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
