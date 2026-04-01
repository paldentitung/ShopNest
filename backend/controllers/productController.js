const productService = require("../services/productService");

exports.getAllProduct = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const savedProduct = await productService.createProduct(req.body, req.file);
  res.status(201).json({ message: "Product created", savedProduct });
};

exports.updateProduct = async (req, res) => {
  const updatedProduct = await productService.updateProduct(
    req.params.id,
    req.body,
    req.file,
  );
  res.status(200).json({
    message: "Updated product successfully",
    updatedProduct: {
      ...updatedProduct.toObject(),
      rating: {
        stars: updatedProduct.rating ?? 0,
        count: updatedProduct.reviewCount ?? 0,
      },
      images: updatedProduct.images || [],
    },
  });
};

exports.deleteProduct = async (req, res) => {
  const deletedProduct = await productService.deleteProduct(req.params.id);
  res
    .status(200)
    .json({ message: "Product deleted successfully", deletedProduct });
};

exports.search = async (req, res) => {
  const products = await productService.search(req.query.query);
  res.json(products);
};
