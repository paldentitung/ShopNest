import toast from "react-hot-toast";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const apiFetch = async (endpoint, options = {}, requireAuth = true) => {
  const userToken = localStorage.getItem("ShopNest-token");

  if (requireAuth && !userToken) {
    // toast.error("User token not found");
    return null;
  }

  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(requireAuth && userToken
      ? { authorization: `Bearer ${userToken}` }
      : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  // handle auth expired
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

  // IMPORTANT: do NOT swallow 403/400 errors
  if (!res.ok) {
    const error = new Error(data?.message || "Request failed");
    error.statusCode = res.status;
    error.response = data;
    throw error;
  }

  return data;
};
