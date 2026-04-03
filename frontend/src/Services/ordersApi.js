// ordersApi.js
import { apiFetch } from "../utils/api";

export const getOrders = async (page = 1, limit = 10) => {
  const data = await apiFetch(`/orders?page=${page}&limit=${limit}`); // ← remove the false
  return data || { data: [], total: 0, page, pages: 1 };
};
