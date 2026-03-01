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

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updates = req.body;
    if (updates.name) {
      updates.slug = slugify(updates.name, { lower: true });
    }

    if (req.file) {
      const imagePath = `uploads/products/${req.file.filename}`;
      updates.images = [imagePath];
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Updated product successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    res
      .status(200)
      .json({ message: "Product delete successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
