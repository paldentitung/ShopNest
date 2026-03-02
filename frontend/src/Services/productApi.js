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
export const createProduct = async (formData) => {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("error");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Create Product Error:", error);
    alert(error.message);
  }
};
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("error");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Create Product Error:", error);
    alert(error.message);
  }
};
