import React from "react";
import AdminHeader from "../../Components/AdminHeader";
const UserManagement = () => {
  return (
    <div className="w-full">
      <AdminHeader title="Product Management" />

      <div className="w-full max-w-7xl mx-auto mt-6 bg-white rounded-xl shadow border border-gray-100 overflow-x-scroll">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">User Name</th>
              <th className="px-6 py-4">User Email</th>
              <th className="px-6 py-4">User Password</th>
              <th className="px-6 py-4">User Role</th>
              <th className="px-6 py-4">user Status</th>
              <th className="px-6 py-4">User TotalOrders</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <tr>
              <td className="px-6 py-4 font-medium text-gray-800">
                Palden Dorje Titung
              </td>
              <td className="px-6 py-4">Palden@gmail.com</td>
              <td className="px-6 py-4">**********</td>

              <td className="px-6 py-4">User</td>

              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  Active
                </span>
              </td>

              <td className="px-6 py-4">120 orders</td>

              <td className="px-6 py-4 flex justify-center items-center mt-3 gap-2">
                <button className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Unblock
                </button>
                <button className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600">
                  Block
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
