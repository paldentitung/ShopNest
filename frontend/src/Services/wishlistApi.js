import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";

export const getWishlist = async () => {
  return await apiFetch("/wishlist", {
    method: "GET",
  });
};
export const addWishlist = async (id) => {
  return await apiFetch(`/wishlist/${id}`, {
    method: "POST",
  });
};

export const removeWishlist = async (id) => {
  return await apiFetch(`/wishlist/${id}`, {
    method: "DELETE",
  });
};
