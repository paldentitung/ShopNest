export const getAllProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/products");

    if (!res.ok) {
      throw new Error("error");
    }
    const data = await res.json();
    console.log(data);
    return data || [];
  } catch (error) {
    alert("error" + error);
  }
};
