const Product = require("../models/Product");
const slugify = require("slugify");

exports.getAllProducts = async () => {
  const products = await Product.find();
  return products.map((p) => ({
    _id: p._id,
    name: p.name,
    slug: p.slug,
    category: p.category || "Clothing",
    images: p.images.map((img) => `http://localhost:3000/${img}`),
    priceCents: p.priceCents,
    averageRating: p.averageRating || 0,
    totalRatings: p.totalRatings || 0,
    description: p.description,
    variations: p.variations,
    stock: p.stock,
  }));
};

exports.createProduct = async (data, file) => {
  const { name, category, priceCents, description, variations } = data;

  const slug = slugify(name, { lower: true });
  const imagePaths = file ? [`uploads/products/${file.filename}`] : [];

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
  if (!product) throw new Error("Product not found");

  if (updates.priceCents) updates.priceCents = Number(updates.priceCents);
  if (updates.stock) updates.stock = Number(updates.stock);
  if (updates.rating) updates.rating = Number(updates.rating);

  if (updates.name) updates.slug = slugify(updates.name, { lower: true });

  if (file) updates.images = [`uploads/products/${file.filename}`];

  const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
    new: true,
  });

  return updatedProduct;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  return await Product.findByIdAndDelete(id);
};

exports.search = async (query) => {
  const filter = {};
  if (query) filter.name = { $regex: query, $options: "i" };
  return await Product.find(filter).limit(50);
};
