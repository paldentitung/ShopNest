import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";
export const getWishlist = async () => {
  try {
    const res = await apiFetch("/wishlist", {
      method: "GET",
    });
    console.log("wishlist", res);
    return res;
  } catch (error) {
    toast.error(error);
  }
};
export const addWishlist = async (id) => {
  try {
    const res = await apiFetch(`/wishlist/${id}`, {
      method: "POST",
    });
    console.log("wishlist", res);
    return res;
  } catch (error) {
    toast.error(error);
  }
};
