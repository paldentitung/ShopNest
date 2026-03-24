import React, { useState } from "react";
import { FaTimes, FaCamera } from "react-icons/fa";
import MainButton from "../MainButton";
import SecondaryButton from "../SecondaryButton";

const EditProfileModal = ({ setShowEditProfileModal }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/40 z-40"
        onClick={() => setShowEditProfileModal(false)}
      ></div>

      {/* Modal */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col space-y-6 z-50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>
          <button
            onClick={() => setShowEditProfileModal(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="border border-black/10"></div>

        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border">
            <img
              src={preview || "/hero-image-3.jpg"}
              alt="profile"
              className="w-full h-full object-cover"
            />

            <label className="absolute bottom-0 right-0 bg-black/70 p-2 rounded-full cursor-pointer">
              <FaCamera className="text-white text-xs" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              Upload a new profile picture
            </p>
            <p className="text-xs text-gray-400">JPG, PNG (Max 2MB)</p>
          </div>
        </div>

        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="border rounded-md border-gray-300 p-2 outline-none transition focus:ring-2 focus:ring-offset-1 focus:ring-(--color-foreground)"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="text"
                placeholder="98XXXXXXXX"
                className="border rounded-md border-gray-300 p-2 outline-none transition focus:ring-2 focus:ring-offset-1 focus:ring-(--color-foreground)"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              value="user@email.com"
              disabled
              className="border rounded-md border-gray-200 bg-gray-100 text-gray-500 p-2 cursor-not-allowed"
            />
          </div>
        </form>

        <div className="flex justify-end gap-3 pt-2">
          <SecondaryButton
            name="Cancel"
            onClick={() => setShowEditProfileModal(false)}
          />
          <MainButton name="Save Changes" />
        </div>
      </div>
    </section>
  );
};

export default EditProfileModal;
