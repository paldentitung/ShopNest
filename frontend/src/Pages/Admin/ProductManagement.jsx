import { useContext, useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import MainButton from "../../Components/MainButton";
import Modal from "../../Components/Modal";
import SecondaryButton from "../../Components/SecondaryButton";
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
  createProduct,
} from "../../Services/productApi";
import { useApp } from "../../Hooks/useApp";

const ProductManagement = () => {
  const { setShowModal } = useApp();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    priceCents: "",
    stock: "",
    description: "",
    imageFile: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      console.log(res);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" && value !== "" ? Number(value) : value,
    }));
  };
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("priceCents", formData.priceCents);
    data.append("stock", formData.stock);
    data.append("rating", formData.rating);
    data.append("description", formData.description);
    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }

    try {
      if (!isEditing) {
        const response = await createProduct(data);

        const newProduct = {
          ...response.data,
          images:
            response.data.images?.map(
              (img) => `http://localhost:3000/${img}`,
            ) || [],
        };

        setProducts((prev) => [...prev, newProduct]);
      } else {
        // Update
        const response = await updateProduct(isEditing, data);

        const updatedProduct = {
          ...products.find((p) => p._id === isEditing), // keep old fields
          ...response.updatedProduct, // overwrite updated fields
          images:
            response.updatedProduct.images?.map(
              (img) => `http://localhost:3000/${img}`,
            ) || products.find((p) => p._id === isEditing).images,
        };
        setProducts((prev) =>
          prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)),
        );

        setIsEditing(null);
      }
      setShowModal(false);
      setFormData({
        name: "",
        category: "",
        priceCents: "",
        stock: "",
        rating: "",
        description: "",
        imageFile: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(product._id);

    setFormData({
      name: product.name,
      category: product.category,
      priceCents: product.priceCents,
      stock: product.stock,
      rating: product.rating,
      description: product.description,
      imageFile: null, // we only upload new image if needed
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note")) return;

    await deleteProduct(id);

    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      (product.category && product.category.toLowerCase().includes(searchTerm)),
  );

  return (
    <>
      <div className="w-full">
        <AdminHeader title="Product Management" />
        <div className="w-full max-w-7xl mx-auto mt-6 bg-white rounded-xl h-screen shadow border border-gray-100 overflow-x-scroll">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border-b border-gray-200 sticky top-0 z-10">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                className={`
        w-full pl-11 pr-4 py-2.5 
        bg-gray-50 border border-gray-300 
        rounded-lg text-gray-900 
        placeholder-gray-500 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-all duration-200 shadow-sm
      `}
                placeholder="Search products by name, category..."
              />
            </div>

            {/* Add Product Button */}
            <div className="shrink-0">
              <MainButton
                name="Add Product"
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>

          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredProducts.map((product, index) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 ">${product.priceCents / 100}</td>

                  <td className="px-6 py-4">
                    <div className="w-12 h-10 bg-gray-200 rounded-md">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      In Stock
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      Shipping
                    </span>
                  </td>

                  <td className="px-6 py-4 flex justify-center items-center mt-3 gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Product Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="productName"
                className="text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Denim Jacket"
                className="border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                id="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Jacket, T-Shirt, Accessories"
                className="border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
              />
            </div>

            {/* Price & Stock – side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700"
                >
                  Price (in cents)
                </label>
                <input
                  id="priceCents"
                  type="number"
                  value={formData.priceCents}
                  onChange={handleChange}
                  placeholder="2999"
                  className="border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="stock"
                  className="text-sm font-medium text-gray-700"
                >
                  Stock Quantity
                </label>
                <input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="50"
                  className="border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Short product description..."
                className="border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm min-h-25 resize-y"
                rows={4}
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="image"
                className="text-sm font-medium text-gray-700"
              >
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50">
                <input
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <div className="text-gray-500 text-sm mb-1">
                    Click to upload or drag & drop
                  </div>
                  <div className="text-xs text-gray-400">
                    PNG, JPG, WEBP (max 5MB)
                  </div>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <SecondaryButton
                name="Cancel"
                onClick={() => setShowModal(false)}
              />
              <MainButton
                name={isEditing ? "Edit Product" : "Add Product"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProductManagement;
