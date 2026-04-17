import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const register = async (UserData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(UserData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const login = async (UserData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(UserData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

export const changePassword = async (userData) => {
  return await apiFetch("/auth/changepassword", {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};
