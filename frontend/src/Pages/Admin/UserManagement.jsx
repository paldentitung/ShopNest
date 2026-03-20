import React, { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import AdminHeader from "./AdminHeader";

const UserManagement = () => {
  const { users, loading } = useContext(AdminContext);

  if (loading) return <p>Loading users...</p>;

  console.log(users);

  return (
    <div className="w-full">
      <AdminHeader title="User Management" />

      <div className="w-full max-w-7xl mx-auto mt-6 bg-white rounded-xl shadow border border-gray-100 overflow-x-scroll">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">User Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-6 py-4">{u.username}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">{u.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  {u.status === "active" ? (
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                      onClick={() => blockUser(u._id)}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                      onClick={() => unblockUser(u._id)}
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
  );
};

export default UserManagement;
