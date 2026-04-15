// utils/notifications.js
import { apiFetch } from "../utils/api";

// Get all notifications
export const getNotifications = async () => {
  const data = await apiFetch("/notifications");
  console.log("Notification data:", data);
  return data?.notifications || data || [];
};

export const readNotification = async (id) => {
  if (!id) return null;

  const data = await apiFetch(`/notifications/${id}/read`, {
    method: "PATCH",
  });
  console.log("Read notification:", data);
  return data;
};

export const readAllNotification = async () => {
  const data = await apiFetch(`/notifications/all`, {
    method: "PATCH",
  });
  console.log("Read notification:", data);
  return data;
};
