const productService = require("../services/productService");

exports.getAllProduct = async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
};

exports.createProduct = async (req, res) => {
  const savedProduct = await productService.createProduct(req.body, req.file);
  res.status(201).json({
    success: true,
    message: "Product created",
    data: savedProduct,
  });
};

exports.updateProduct = async (req, res) => {
  const updatedProduct = await productService.updateProduct(
    req.params.id,
    req.body,
    req.file,
  );
  res.status(200).json({
    success: true,
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
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: deletedProduct,
  });
};

exports.search = async (req, res) => {
  const products = await productService.search(req.query.query);
  res.status(200).json({
    success: true,
    message: products.length
      ? "Products found"
      : "No products match your search",
    data: products,
  });
};
