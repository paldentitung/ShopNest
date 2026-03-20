import toast from "react-hot-toast";

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const userToken = localStorage.getItem("ShopNest-token");

    if (!userToken) return toast.error("user token not found");

    const headers = {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(userToken && { authorization: `Bearer ${userToken}` }),
      ...options.headers,
    };

    const res = await fetch(`http://localhost:3000/api${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Something went wrong");

    return data;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};
