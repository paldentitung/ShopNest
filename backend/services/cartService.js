const Cart = require("../models/Cart");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

exports.getCart = async (userId) => {
  return await Cart.findOne({ userId }).populate("items.product");
};

exports.addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ product: productId, quantity: quantity || 1 }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
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
