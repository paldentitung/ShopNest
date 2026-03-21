import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";

export const getAllProducts = async () => {
  const data = await apiFetch("/products", {}, false);
  return data || { items: [] };
};

export const createProduct = async (formData) => {
  const data = await apiFetch("/products", {
    method: "POST",
    body: formData,
  });

  return data;
};
export const updateProduct = async (id, productData) => {
  return await apiFetch(`/products/${id}`, {
    method: "PUT",
    body: productData,
  });
};

export const deleteProduct = async (id) => {
  return await apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
};

export const searchProduct = async (query) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/search?query=${encodeURIComponent(query)}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    toast.error(error.message);
    return [];
  }
};
