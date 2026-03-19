export const getNotifications = async () => {
  const userToken = localStorage.getItem("ShopNext-token");

  try {
    if (!userToken) {
      return []; // ✅
    }

    const res = await fetch("http://localhost:3000/api/notifications", {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    });

    const data = await res.json();

    console.log("notification data", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch");
    }

    return data.notifications || data || []; // ✅ flexible
  } catch (error) {
    console.error(error);
    return []; // ✅
  }
};
export const readNotification = async (id) => {
  const userToken = localStorage.getItem("ShopNext-token");

  try {
    if (!userToken) {
      console.log("No token found, skipping API call");
      return { items: [] };
    }
    const res = await fetch(
      `http://localhost:3000/api/notifications/${id}/read`,
      {
        method: "PATCH",
        headers: { authorization: `Bearer ${userToken}` },
      },
    );

    const data = await res.json();
    console.log("read notificaton ", data);
    return data;
  } catch (error) {
    console.error(error);
    return null; // ✅
  }
};
