import React, { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import AdminHeader from "./AdminHeader";
import { apiFetch } from "../../utils/api";
import toast from "react-hot-toast";

const UserManagement = () => {
  const { users, loading, blockUser, unblockUser } = useContext(AdminContext);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading users...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="User Management" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Total Users
            </p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {users.length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Active
            </p>
            <p className="text-2xl font-semibold text-green-600 mt-1">
              {users.filter((u) => u.status === "active").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Blocked
            </p>
            <p className="text-2xl font-semibold text-red-500 mt-1">
              {users.filter((u) => u.status !== "active").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">All Users</h2>
            <span className="text-xs text-gray-400">{users.length} total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* User */}
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold shrink-0">
                          {u.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">
                          {u.username}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-3.5 text-gray-500">{u.email}</td>

                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize">
                        {u.role}
                      </span>
                    </td>

                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          u.status === "active"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.status === "active"
                              ? "bg-green-500"
                              : "bg-red-400"
                          }`}
                        />
                        {u.status}
                      </span>
                    </td>

                    <td className="px-6 py-3.5 text-center">
                      {u.status === "active" ? (
                        <button
                          onClick={() => blockUser(u._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 transition"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => unblockUser(u._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition"
                        >
                          Unblock
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
