import toast from "react-hot-toast";

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
    toast.error(error);
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
    toast.error(error);
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PUT",
      body: productData,
    });

    if (!res.ok) {
      throw new Error("error");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    toast.error(error);
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
    toast.error(error);
  }
};

export const searchProduct = async (query) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/search?query=${encodeURIComponent(query)}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    toast.error(error.message);
    return [];
  }
};
