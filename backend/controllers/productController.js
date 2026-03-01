const Product = require("../models/Product");
const slugify = require("slugify");

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();

    const orderedProducts = products.map((p) => ({
      name: p.name,
      slug: p.slug,
      category: p.category || "Clothing",
      images: `http://localhost:3000${p.images}`,
      priceCents: p.priceCents,
      rating: p.rating,
      description: p.description,
      variations: p.variations,
      stock: p.stock,
    }));

    res.status(200).json(orderedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      priceCents,
      rating,
      description,
      variations,
      stock,
    } = req.body;

    const slug = slugify(name, { lower: true });
    const imagePaths = req.file
      ? [`uploads/products/${req.file.filename}`]
      : [];

    const newProduct = new Product({
      name,
      slug,
      category,
      priceCents,
      rating,
      description,
      stock,
      variations,
      images: imagePaths,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created",
      savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
