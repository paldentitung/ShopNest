import { createContext, useContext, useState, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "../utils/api";
import toast from "react-hot-toast";

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ user, onClose, children }) => {
  const { loginUser } = useContext(AuthContext);

  const [preview, setPreview] = useState(user?.avatar || "/hero-image-3.jpg");

  const [formData, setFormData] = useState({
    fullName: user?.username || "",
    phone: user?.phone || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zip: user?.address?.zip || "",
      country: user?.address?.country || "",
    },
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    setPreview(URL.createObjectURL(file));
    setImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be under 2MB");
        return;
      }
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // ✅ UPDATED (supports nested address)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];

      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      if (imageFile) payload.append("avatar", imageFile);
      payload.append("username", formData.fullName);
      payload.append("phone", formData.phone);

      // ✅ IMPORTANT
      payload.append("address", JSON.stringify(formData.address));

      const res = await apiFetch("/user", {
        method: "POST",
        body: payload,
      });

      loginUser(localStorage.getItem("ShopNest-token"), res.data);

      toast.success("Profile updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetPreview = () => {
    setPreview(user?.avatar || "/hero-image-3.jpg");
    setImageFile(null);
  };
  return (
    <UserProfileContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
