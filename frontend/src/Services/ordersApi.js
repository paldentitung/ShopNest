import { apiFetch } from "../utils/api";

export const getOrders = async () => {
  const data = await apiFetch("/orders", {
    method: "GET",
  });
  return data || [];
};
