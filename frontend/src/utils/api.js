import toast from "react-hot-toast";

export const apiFetch = async (endpoint, options = {}, requireAuth = true) => {
  try {
    const userToken = localStorage.getItem("ShopNest-token");

    if (requireAuth && !userToken) {
      toast.error("User token not found");
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

    const res = await fetch(`http://localhost:3000/api${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (res.status === 401) {
      localStorage.removeItem("ShopNest-token");

      toast.error("Session expired. Please login again.");

      window.location.href = "/login";
      return null;
    }

    if (!res.ok) throw new Error(data.message || "Something went wrong");

    return data;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};
