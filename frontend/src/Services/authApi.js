import toast from "react-hot-toast";

export const register = async (UserData) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(UserData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    toast.error("error" + error);
  }
};

export const login = async (UserData) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(UserData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    toast.error("error" + error);
  }
};
