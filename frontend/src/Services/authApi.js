import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";

export const register = async (UserData) => {
  const res = await fetch("http://localhost:3000/api/auth/register", {
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

export const login = async (UserData) => {
  const res = await fetch("http://localhost:3000/api/auth/login", {
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
