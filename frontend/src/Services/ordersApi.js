import toast from "react-hot-toast";

export const getOrders = async () => {
  try {
    const res = await fetch(" http://localhost:3000/api/orders");
    const data = await res.json();
    return data;
  } catch (error) {
    toast.error(error);
  }
};
