const Product = require("../models/Product");
const slugify = require("slugify");
const AppError = require("../utils/AppError");

exports.getAllProducts = async (page = null, limit = null) => {
  let query = Product.find();

  let total = 0;
  let pages = 1;

  if (page && limit) {
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    total = await Product.countDocuments();
    pages = Math.ceil(total / limit);
  }

  const products = await query;

  const mappedProducts = products.map((p) => ({
    _id: p._id,
    name: p.name,
    slug: p.slug,
    category: p.category || "Clothing",

    images: Array.isArray(p.images) ? p.images : [],

    priceCents: p.priceCents,
    averageRating: p.averageRating || 0,
    totalRatings: p.totalRatings || 0,
    description: p.description,
    variations: p.variations,
    stock: p.stock,
  }));

  if (page && limit) {
    return {
      products: mappedProducts,
      total,
      page,
      pages,
    };
  }

  return { products: mappedProducts };
};
exports.createProduct = async (data, file) => {
  const { name, category, priceCents, description, variations } = data;

  const slug = slugify(name, { lower: true });

  const imagePaths = file ? [file.secure_url || file.path] : [];

  const newProduct = new Product({
    name,
    slug,
    category,
    priceCents: Number(priceCents),
    rating: 0,
    description,
    stock: 0,
    variations,
    images: imagePaths,
  });

  return await newProduct.save();
};
exports.updateProduct = async (id, updates, file) => {
  const product = await Product.findById(id);

  if (!product) throw new AppError("Product not found", 404);

  if (updates.priceCents) updates.priceCents = Number(updates.priceCents);
  if (updates.stock) updates.stock = Number(updates.stock);
  if (updates.rating) updates.rating = Number(updates.rating);

  if (updates.name) updates.slug = slugify(updates.name, { lower: true });

  if (file) {
    updates.images = [file.secure_url || file.path];
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
    new: true,
  });

  return updatedProduct;
};
exports.deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError("Product not found", 404);

  return await Product.findByIdAndDelete(id);
};

exports.search = async (query) => {
  const filter = {};
  if (query) filter.name = { $regex: query, $options: "i" };
  return await Product.find(filter).limit(50);
};
