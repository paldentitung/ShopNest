// utils/notifications.js
import { apiFetch } from "../utils/api";

// Get all notifications
export const getNotifications = async () => {
  try {
    const data = await apiFetch("/notifications");
    console.log("Notification data:", data);
    // Always return an array
    return data?.notifications || data || [];
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
};

// Mark a notification as read
export const readNotification = async (id) => {
  if (!id) return null;

  try {
    const data = await apiFetch(`/notifications/${id}/read`, {
      method: "PATCH",
    });
    console.log("Read notification:", data);
    return data;
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    return null;
  }
};

export const readAllNotification = async () => {
  try {
    const data = await apiFetch(`/notifications/all`, {
      method: "PATCH",
    });
    console.log("Read notification:", data);
    return data;
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    return null;
  }
};
