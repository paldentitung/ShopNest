import { apiFetch } from "../utils/api";

export const getCart = async () => {
  const data = await apiFetch("/cart");
  return data || { items: [] };
};

export const addToCart = async (productData) => {
  return await apiFetch("/cart", {
    method: "POST",
    body: JSON.stringify(productData),
  });
};

export const updateCartQuantity = async (cartItemId, quantity) => {
  return await apiFetch(`/cart/${cartItemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
};

export const removeFromCart = async (productId) => {
  return await apiFetch(`/cart/${productId}`, {
    method: "DELETE",
  });
};
