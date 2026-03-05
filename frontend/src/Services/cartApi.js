import toast from "react-hot-toast";
const userToken = localStorage.getItem("ShopNext-token");

export const getCart = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/cart", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const addToCart = async (productData) => {
  try {
    const res = await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    toast.error(error.message);
  }
};
