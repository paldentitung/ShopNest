import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";

export const getAllProducts = async (page = 1, limit = 20) => {
  const data = await apiFetch(
    `/products?page=${page}&limit=${limit}`,
    {},
    false,
  );

  console.log("data for pagination", data);

  return data || { products: [], total: 0, page, pages: 1 };
};

export const createProduct = async (formData) => {
  return await apiFetch("/products", {
    method: "POST",
    body: formData,
  });
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
    const data = await apiFetch(
      `/products/search?query=${encodeURIComponent(query)}`,
      {},
      false,
    );

    return data || [];
  } catch (error) {
    toast.error(error.message);
    return [];
  }
};
