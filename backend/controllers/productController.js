const Product = require("../models/Product");

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
