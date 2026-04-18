import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
toast;
export const apiFetch = async (endpoint, options = {}, requireAuth = true) => {
  const userToken = localStorage.getItem("ShopNest-token");

  if (requireAuth && !userToken) {
    toast.error("User not logged in");
    return null;
  }

  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(requireAuth && userToken
      ? { Authorization: `Bearer ${userToken}` }
      : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 🔥 IMPORTANT FIX: read raw response first
  const text = await res.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    console.error("❌ Invalid JSON response:", text);
    throw new Error("Server returned invalid response");
  }

  // auth handling
  if (res.status === 401) {
    localStorage.removeItem("ShopNest-token");
    toast.error("Session expired. Please login again.");
    window.location.href = "/login";
    return null;
  }

  if (res.status === 403) {
    localStorage.removeItem("ShopNest-token");
    localStorage.removeItem("ShopNest-user");

    toast.error("You have been blocked");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);

    return null;
  }

  if (!res.ok) {
    const error = new Error(data?.message || "Request failed");
    error.statusCode = res.status;
    error.response = data;
    throw error;
  }

  return data;
};
