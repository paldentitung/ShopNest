const Cart = require("../models/Cart");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

exports.getCart = async (userId) => {
  return await Cart.findOne({ userId }).populate("items.product");
};

exports.addToCart = async (userId, productId, quantity = 1) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.stock === 0) {
    throw new AppError("Product is out of stock", 400);
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    if (quantity > product.stock) {
      throw new AppError(`Only ${product.stock} items available`, 400);
    }

    cart = new Cart({
      userId,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      const newQty = cart.items[itemIndex].quantity + quantity;

      if (newQty > product.stock) {
        throw new AppError(`Only ${product.stock} items available`, 400);
      }

      cart.items[itemIndex].quantity = newQty;
    } else {
      if (quantity > product.stock) {
        throw new AppError(`Only ${product.stock} items available`, 400);
      }

      cart.items.push({
        product: productId,
        quantity,
      });
    }
  }

  await cart.save();
  return cart;
};
exports.updateQuantity = async (userId, cartItemId, quantity) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError("Cart not found", 404);

  const item = cart.items.find((i) => i._id.toString() === cartItemId);
  if (!item) throw new AppError("Item not found", 404);

  item.quantity = quantity;
  await cart.save();
  return cart;
};

exports.removeFromCart = async (userId, cartItemId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError("Cart not found", 404);

  cart.items = cart.items.filter((item) => item._id.toString() !== cartItemId);

  await cart.save();

  return cart;
};
