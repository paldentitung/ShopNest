import React from "react";
import AdminHeader from "../../Components/AdminHeader";

const ProductManagement = () => {
  return (
    <div className="w-full">
      <AdminHeader title="Product Management" />

      <div className="w-full max-w-7xl mx-auto mt-6 bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <tr>
              <td className="px-6 py-4 font-medium text-gray-800">
                Denim Jacket
              </td>
              <td className="px-6 py-4">Jacket</td>
              <td className="px-6 py-4">$29.99</td>

              <td className="px-6 py-4">
                <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
              </td>

              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  In Stock
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  Shipping
                </span>
              </td>

              <td className="px-6 py-4 flex justify-center items-center mt-3 gap-2">
                <button className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Edit
                </button>
                <button className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
