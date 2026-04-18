import React from "react";
import {
  FaTimes,
  FaCamera,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTrashAlt,
} from "react-icons/fa";
import MainButton from "../common/MainButton";
import SecondaryButton from "../common/SecondaryButton";
import {
  UserProfileProvider,
  useUserProfile,
} from "../../Context/UserProfileContext";
import { useAuth } from "../../Hooks/useAuth";

const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 outline-none transition focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/5 placeholder:text-gray-300";

const labelClass =
  "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400";

const EditProfileForm = () => {
  const {
    preview,
    formData,
    loading,
    dragOver,
    setDragOver,
    fileInputRef,
    handleImageChange,
    handleDrop,
    handleChange,
    handleSubmit,
    user,
    onClose,
    resetPreview,
  } = useUserProfile();

  const { removeAvatar } = useAuth();

  const handleRemoveAvatar = async () => {
    try {
      const updatedUser = await removeAvatar();

      resetPreview();

      localStorage.setItem("ShopNest-user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 min-h-screen overflow-auto p-2">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg bg-white  rounded-md shadow-2xl overflow-hidden z-50 max-h-[92dvh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
            Edit Profile
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 hover:rotate-90 transition-all duration-200"
          >
            <FaTimes size={13} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-5 sm:px-7 sm:py-6 flex flex-col gap-5 sm:gap-6">
          {/* Profile Image */}
          <div className="flex items-center gap-5">
            <div
              className={`relative w-20 h-20 shrink-0 rounded-full group cursor-pointer ${
                dragOver ? "ring-2 ring-offset-2 ring-gray-900" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={preview}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100 group-hover:brightness-75 transition duration-200"
              />
              <div className="absolute bottom-0.5 right-0.5 w-6 h-6 bg-gray-900 rounded-full border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
                <FaCamera className="text-white text-[9px]" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Profile photo</p>
              <p className="text-xs text-gray-400 mt-0.5">
                JPG or PNG · Max 2MB · Drag & drop or click
              </p>
            </div>

            <button
              type="button"
              onClick={handleRemoveAvatar}
              className="text-xs text-red-600 hover:underline w-fit mt-1 active:bg-blue-500"
            >
              <FaTrashAlt />
            </button>
          </div>

          <div className="border-t border-gray-100" />

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>
                  <FaUser size={10} /> Full Name
                </label>
                <input
                  className={inputClass}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>
                  <FaPhone size={10} /> Phone
                </label>
                <input
                  className={inputClass}
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98XXXXXXXX"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                <FaMapMarkerAlt size={10} /> Address
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <input
                  className={inputClass}
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  placeholder="Street"
                />

                <input
                  className={inputClass}
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder="City"
                />

                <input
                  className={inputClass}
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  placeholder="State"
                />

                <input
                  className={inputClass}
                  type="text"
                  name="address.zip"
                  value={formData.address.zip}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                />

                <input
                  className={inputClass}
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>
                <FaEnvelope size={10} /> Email Address
              </label>
              <input
                className="w-full border border-gray-100 rounded-lg px-3 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed outline-none"
                type="email"
                value={user?.email || ""}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-4 sm:px-7 py-4 border-t border-gray-100 bg-gray-50/50">
          <SecondaryButton type="button" name="Cancel" onClick={onClose} />
          <MainButton
            name={loading ? "Saving…" : "Save Changes"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

const EditProfileModal = ({ setShowEditProfileModal, user }) => {
  return (
    <UserProfileProvider
      user={user}
      onClose={() => setShowEditProfileModal(false)}
    >
      <EditProfileForm />
    </UserProfileProvider>
  );
};

export default EditProfileModal;
