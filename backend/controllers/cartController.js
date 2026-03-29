const cartService = require("../services/cartService");
exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({
        message: "Invalid product or quantity",
      });
    }

    const cart = await cartService.addToCart(req.user.id, productId, quantity);

    res.status(200).json(cart);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};
exports.updateQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const cart = await cartService.updateQuantity(
      req.user.id,
      cartItemId,
      quantity,
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cart = await cartService.removeFromCart(req.user.id, cartItemId);

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
