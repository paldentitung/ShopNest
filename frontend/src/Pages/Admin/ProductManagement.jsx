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
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

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

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts(page, 3);
      setProducts(res.data);
      setPages(res.pages);
    };
    fetchProducts();
  }, [page]);

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
    if (formData.imageFile) data.append("image", formData.imageFile);

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
        toast.success("Product Added");
      } else {
        const response = await updateProduct(isEditing, data);
        const updatedProduct = {
          ...products.find((p) => p._id === isEditing),
          ...response.updatedProduct,
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
      toast.error(error.message);
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
      imageFile: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      (product.category && product.category.toLowerCase().includes(searchTerm)),
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader title="Product Management" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Total Products
              </p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {products.length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                In Stock
              </p>
              <p className="text-2xl font-semibold text-green-600 mt-1">
                {products.filter((p) => p.stock > 0).length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                Out of Stock
              </p>
              <p className="text-2xl font-semibold text-red-500 mt-1">
                {products.filter((p) => p.stock === 0).length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex  sm:flex-row flex-nowrap  gap-3 items-start sm:items-center justify-between">
              <div className="relative w-full max-w-sm">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by name or category..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition bg-gray-50"
                />
              </div>
              <div>
                {" "}
                <div className="hidden md:block">
                  <MainButton
                    name="Add Product"
                    onClick={() => setShowModal(true)}
                  />
                </div>
                <div
                  className="mt-3  block md:hidden"
                  onClick={() => setShowModal(true)}
                >
                  <FaPlus />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                            {product.images?.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <svg
                                className="w-5 h-5 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="font-medium text-gray-800">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-6 py-3.5 font-medium text-gray-800">
                        ${(product.priceCents / 100).toFixed(2)}
                      </td>

                      <td className="px-6 py-3.5 text-gray-600">
                        {product.stock}
                      </td>

                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            product.stock > 0
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-600 border-red-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-400"}`}
                          />
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>

                      <td className="px-6 py-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 transition"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Page {page} of {pages}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ← Prev
                </button>
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 text-xs font-medium rounded-lg transition ${
                      p === page
                        ? "bg-indigo-600 text-white border border-indigo-600"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, pages))}
                  disabled={page === pages}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal>
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-900">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEditing
                ? "Update the product details below."
                : "Fill in the details to add a new product."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-gray-500"
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Denim Jacket"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="category"
                className="text-xs font-medium text-gray-500"
              >
                Category
              </label>
              <input
                id="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="e.g. Jacket, T-Shirt, Accessories"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="priceCents"
                  className="text-xs font-medium text-gray-500"
                >
                  Price (in cents)
                </label>
                <input
                  id="priceCents"
                  type="number"
                  value={formData.priceCents}
                  onChange={handleChange}
                  required
                  placeholder="2999"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="stock"
                  className="text-xs font-medium text-gray-500"
                >
                  Stock Quantity
                </label>
                <input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  placeholder="50"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="description"
                className="text-xs font-medium text-gray-500"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Short product description..."
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">
                Product Image
              </label>
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-200 rounded-lg p-5 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/40 transition bg-gray-50"
              >
                <svg
                  className="w-7 h-7 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs text-gray-400">
                  {formData.imageFile
                    ? formData.imageFile.name
                    : "Click to upload · PNG, JPG, WEBP"}
                </span>
                <input
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 mt-1">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                {isEditing ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProductManagement;
