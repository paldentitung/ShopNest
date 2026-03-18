import toast from "react-hot-toast";
const userToken = localStorage.getItem("ShopNext-token");

export const getOrders = async () => {
  try {
    const res = await fetch(" http://localhost:3000/api/orders", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    toast.error(error);
  }
};
