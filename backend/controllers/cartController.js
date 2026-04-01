const cartService = require("../services/cartService");
exports.getCart = async (req, res) => {
  const cart = await cartService.getCart(req.user.id);
  res.status(200).json({
    success: true,
    message: "Cart fetched ",
    data: cart,
  });
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || quantity <= 0) {
    return res.status(400).json({
      message: "Invalid product or quantity",
    });
  }
  const cart = await cartService.addToCart(req.user.id, productId, quantity);
  res.status(200).json({
    success: true,
    message: "Product add to cart ",
    data: cart,
  });
};
exports.updateQuantity = async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  const cart = await cartService.updateQuantity(
    req.user.id,
    cartItemId,
    quantity,
  );

  res.status(200).json({
    success: true,
    message: "Quantity updated ",
    data: cart,
  });
};

exports.removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  const cart = await cartService.removeFromCart(req.user.id, cartItemId);

  res.status(200).json({
    success: true,
    message: "Product remove from cart ",
    data: cart,
  });
};
