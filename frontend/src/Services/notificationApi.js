export const getNotifications = async () => {
  const userToken = localStorage.getItem("ShopNext-token");

  try {
    const res = await fetch("http://localhost:3000/api/notifications", {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    });

    const data = await res.json();
    console.log("notification data ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const readNotification = async (id) => {
  const userToken = localStorage.getItem("ShopNext-token");

  try {
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
  }
};
